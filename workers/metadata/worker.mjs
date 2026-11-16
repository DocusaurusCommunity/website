// Adapted from homotechsual/docusaurus-plugin-showcase, examples/metadata-worker.
// SPDX-License-Identifier: Apache-2.0
const TTL = 900

class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin')
  const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map((value) => value.trim())
  let preview = false
  if (origin && env.PAGES_PROJECT) {
    const url = new URL(origin)
    const domain = `${env.PAGES_PROJECT}.pages.dev`
    preview = url.protocol === 'https:' && !url.port &&
      (url.hostname === domain || url.hostname.endsWith(`.${domain}`))
  }
  return {
    ...(origin && (allowed.includes(origin) || preview) ? { 'Access-Control-Allow-Origin': origin } : {}),
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Vary': 'Origin',
  }
}

async function upstream(url, env, github = false) {
  const response = await fetch(url, {
    headers: github ? {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'docusaurus-community-metadata',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
    } : { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
  })
  if (response.status === 404) return null
  if (github && url.endsWith('/commits?per_page=1') && response.status === 409) {
    const body = await response.json()
    if (body.message === 'Git Repository is empty.') return []
  }
  if (!response.ok) {
    throw new HttpError(response.status === 429 || response.status === 403 ? 503 : 502,
      `Metadata provider request failed (${response.status}).`)
  }
  return response.json()
}

async function githubRepository(repo, env, cache, origin) {
  const key = new Request(`${origin}/_repository?repo=${encodeURIComponent(repo)}`)
  const cached = await cache.match(key)
  if (cached) return cached.json()
  const value = await upstream(`https://api.github.com/repos/${repo}`, env, true)
  if (!value || value.private !== false) throw new HttpError(404, 'Public GitHub repository not found.')
  const response = Response.json(value, { headers: { 'Cache-Control': `public, max-age=${TTL}` } })
  await cache.put(key, response)
  return value
}

export default {
  async fetch(request, env, context) {
    let cors = {}
    try {
      cors = corsHeaders(request, env)
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
      if (request.method !== 'GET') throw new HttpError(405, 'Only GET is supported.')
      const url = new URL(request.url)
      if (url.pathname === '/health') return Response.json({ ok: true }, { headers: cors })
      let providerUrl
      let packageName
      let repo
      if (url.pathname === '/npm') {
        packageName = url.searchParams.get('package')
        if (!packageName || packageName.length > 214 ||
          !/^(?:@[a-z0-9._-]+\/)?[a-z0-9][a-z0-9._-]*$/i.test(packageName)) {
          throw new HttpError(400, 'Invalid npm package name.')
        }
        providerUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`
      } else if (url.pathname === '/github/release' || url.pathname === '/github/commit') {
        repo = url.searchParams.get('repo')
        if (!repo || repo.length > 200 || !/^[a-z0-9][a-z0-9-]*\/[a-z0-9._-]+$/i.test(repo) ||
          repo.split('/')[1] === '.' || repo.split('/')[1] === '..') {
          throw new HttpError(400, 'Invalid GitHub repository.')
        }
        providerUrl = `https://api.github.com/repos/${repo}/${url.pathname.endsWith('release') ? 'releases/latest' : 'commits?per_page=1'}`
      } else {
        throw new HttpError(404, 'Unknown metadata endpoint.')
      }
      const cache = caches.default
      const keyUrl = new URL(url.pathname, url.origin)
      keyUrl.searchParams.set(packageName ? 'package' : 'repo', packageName ?? repo)
      const key = new Request(keyUrl)
      const cached = await cache.match(key)
      if (cached) {
        const response = new Response(cached.body, cached)
        for (const [name, value] of Object.entries(cors)) response.headers.set(name, value)
        return response
      }
      if (repo) await githubRepository(repo, env, cache, url.origin)
      const data = await upstream(providerUrl, env, !!repo)
      let values
      if (packageName) {
        if (!data) throw new HttpError(404, 'npm package not found.')
        if (typeof data.version !== 'string') throw new HttpError(502, 'Invalid npm version response.')
        values = [{ text: `${packageName}: ${data.version}`, href: `https://www.npmjs.com/package/${packageName}` }]
      } else if (url.pathname.endsWith('release')) {
        if (data === null) {
          values = [{ text: 'No stable releases published' }]
        } else {
          if (typeof data.tag_name !== 'string' || typeof data.published_at !== 'string' ||
            !Number.isFinite(Date.parse(data.published_at))) throw new HttpError(502, 'Invalid GitHub release response.')
          values = [{ text: data.tag_name, date: data.published_at, href: `https://github.com/${repo}/releases/tag/${encodeURIComponent(data.tag_name)}` }]
        }
      } else {
        if (!Array.isArray(data)) throw new HttpError(502, 'Invalid GitHub commit response.')
        if (data.length === 0) {
          values = [{ text: 'No code updates' }]
        } else {
          const commit = data[0]
          if (typeof commit.sha !== 'string' || !/^[a-f0-9]{40,64}$/i.test(commit.sha) ||
            !Number.isFinite(Date.parse(commit.commit?.committer?.date))) throw new HttpError(502, 'Invalid GitHub commit response.')
          values = [{ text: commit.sha.slice(0, 7), date: commit.commit.committer.date, href: `https://github.com/${repo}/commit/${commit.sha}` }]
        }
      }
      const response = Response.json({ values }, {
        headers: { 'Cache-Control': `public, max-age=${TTL}`, 'X-Content-Type-Options': 'nosniff' },
      })
      context.waitUntil(cache.put(key, response.clone()))
      for (const [name, value] of Object.entries(cors)) response.headers.set(name, value)
      return response
    } catch (error) {
      console.error('Metadata request failed:', error)
      return Response.json({ error: error instanceof HttpError ? error.message : 'Metadata request failed.' }, {
        status: error instanceof HttpError ? error.status : 502,
        headers: { ...cors, 'Cache-Control': 'no-store' },
      })
    }
  },
}
