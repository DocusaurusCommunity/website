import assert from 'node:assert/strict'
import { afterEach, beforeEach, test } from 'node:test'
import worker from '../workers/metadata/worker.mjs'
import { githubCommit, githubRelease, npmVersions } from '../src/utils/showcaseMetadata.ts'

const env = {
  ALLOWED_ORIGINS: 'https://docusaurus.community,http://localhost:3000',
  PAGES_PROJECT: 'docusauruscommunity-website',
  GITHUB_TOKEN: 'test-token',
}
const originalFetch = globalThis.fetch
const originalCaches = globalThis.caches
let stored
let pending
let calls
let responses

beforeEach(() => {
  stored = new Map()
  pending = []
  calls = []
  responses = []
  globalThis.fetch = async (...args) => {
    calls.push(args)
    const response = responses.shift()
    assert.ok(response, 'Unexpected upstream request')
    return response
  }
  globalThis.caches = { default: {
    match: async (key) => stored.get(key.url)?.clone(),
    put: async (key, response) => { stored.set(key.url, response.clone()) },
  } }
})

afterEach(() => {
  globalThis.fetch = originalFetch
  if (originalCaches === undefined) delete globalThis.caches
  else globalThis.caches = originalCaches
})

async function request(path, origin = 'https://docusaurus.community', method = 'GET') {
  const response = await worker.fetch(new Request(`https://metadata.example.com${path}`, {
    method, headers: { Origin: origin },
  }), env, { waitUntil: (promise) => pending.push(promise) })
  await Promise.all(pending)
  pending = []
  return response
}

test('npm versions use latest, normalize cache keys, and attach CORS per request', async () => {
  responses.push(Response.json({ version: '1.2.3' }))
  const first = await request('/npm?package=%40scope%2Fname&ignored=1')
  assert.equal(first.status, 200)
  assert.deepEqual(await first.json(), {
    values: [{ text: '@scope/name: 1.2.3', href: 'https://www.npmjs.com/package/@scope/name' }],
  })
  assert.equal(calls[0][0], 'https://registry.npmjs.org/%40scope%2Fname/latest')
  assert.equal(calls[0][1].headers.Authorization, undefined)
  assert.equal(first.headers.get('Cache-Control'), 'public, max-age=900')
  const preview = 'https://branch.docusauruscommunity-website.pages.dev'
  const second = await request('/npm?package=@scope/name', preview)
  assert.equal(second.headers.get('Access-Control-Allow-Origin'), preview)
  assert.equal(calls.length, 1)
  assert.equal([...stored.values()][0].headers.has('Access-Control-Allow-Origin'), false)
})

test('GitHub release and commit use distinct endpoints and share the repository check', async () => {
  const date = '2026-11-01T12:00:00Z'
  const sha = 'a'.repeat(40)
  responses.push(
    Response.json({ private: false }),
    Response.json({ tag_name: 'v2.0.0', published_at: date }),
    Response.json([{ sha, commit: { committer: { date } } }]),
  )
  const release = await request('/github/release?repo=owner/repo')
  assert.deepEqual(await release.json(), {
    values: [{ text: 'v2.0.0', date, href: 'https://github.com/owner/repo/releases/tag/v2.0.0' }],
  })
  const commit = await request('/github/commit?repo=owner/repo')
  assert.deepEqual(await commit.json(), {
    values: [{ text: 'aaaaaaa', date, href: `https://github.com/owner/repo/commit/${sha}` }],
  })
  assert.deepEqual(calls.map(([url]) => url), [
    'https://api.github.com/repos/owner/repo',
    'https://api.github.com/repos/owner/repo/releases/latest',
    'https://api.github.com/repos/owner/repo/commits?per_page=1',
  ])
  assert.equal(calls[0][1].headers.Authorization, `Bearer ${env.GITHUB_TOKEN}`)
})

test('repositories without releases or commits return explicit values', async () => {
  responses.push(
    Response.json({ private: false }),
    new Response(null, { status: 404 }),
    Response.json({ message: 'Git Repository is empty.' }, { status: 409 }),
  )
  assert.deepEqual(await (await request('/github/release?repo=owner/empty')).json(), {
    values: [{ text: 'No stable releases published' }],
  })
  assert.deepEqual(await (await request('/github/commit?repo=owner/empty')).json(), {
    values: [{ text: 'No code updates' }],
  })
})

test('health and preflight do not call upstream; CORS excludes lookalike domains', async () => {
  assert.deepEqual(await (await request('/health')).json(), { ok: true })
  assert.equal((await request('/npm', 'http://localhost:3000', 'OPTIONS')).status, 204)
  for (const origin of [
    'https://docusauruscommunity-website.pages.dev.evil.example',
    'https://other.pages.dev',
    'http://branch.docusauruscommunity-website.pages.dev',
    'https://branch.docusauruscommunity-website.pages.dev:8443',
  ]) {
    assert.equal((await request('/health', origin)).headers.get('Access-Control-Allow-Origin'), null)
  }
  assert.equal(calls.length, 0)
})

test('invalid inputs, private repositories, and provider failures are errors, not cached values', async (t) => {
  t.mock.method(console, 'error', () => {})
  for (const path of ['/npm?package=../secret', '/github/release?repo=owner/..', '/other']) {
    assert.ok((await request(path)).status >= 400)
  }
  assert.equal((await request('/health', undefined, 'POST')).status, 405)
  assert.equal(calls.length, 0)
  responses.push(Response.json({ private: true }))
  assert.equal((await request('/github/release?repo=owner/private')).status, 404)
  assert.equal(calls.length, 1)
  responses.push(new Response(null, { status: 429 }))
  const failed = await request('/npm?package=rate-limited')
  assert.equal(failed.status, 503)
  assert.equal(failed.headers.get('Cache-Control'), 'no-store')
  responses.push(Response.json({ version: '2.0.0' }))
  assert.equal((await request('/npm?package=rate-limited')).status, 200)
})

test('malformed provider responses are rejected', async (t) => {
  t.mock.method(console, 'error', () => {})
  responses.push(Response.json({ version: 123 }))
  assert.equal((await request('/npm?package=invalid-version')).status, 502)
  responses.push(
    Response.json({ private: false }),
    Response.json({ tag_name: 'v1', published_at: 'not-a-date' }),
    Response.json([{ sha: 'bad', commit: { committer: { date: 'not-a-date' } } }]),
  )
  assert.equal((await request('/github/release?repo=owner/invalid')).status, 502)
  assert.equal((await request('/github/commit?repo=owner/invalid')).status, 502)
})

function context(name) {
  return { options: { endpoint: `https://${name}.example.com` } }
}

function item(fields = {}) {
  return { id: 'test.plugin', name: 'Test', description: 'Test plugin', tags: [], ...fields }
}

test('resolvers skip inapplicable fields without requests', async () => {
  assert.equal(await npmVersions(item(), context('skip')), null)
  assert.equal(await githubRelease(item({ source: 'https://gitlab.com/owner/repo' }), context('skip')), null)
  assert.equal(await githubCommit(item(), context('skip')), null)
  assert.equal(calls.length, 0)
})

test('npm resolver resolves all packages and deduplicates shared requests', async () => {
  const values = [{ text: '@scope/one: 1.0.0' }, { text: 'two: 2.0.0' }]
  responses.push(Response.json({ values: [values[0]] }), Response.json({ values: [values[1]] }))
  const packages = item({ npmPackages: ['@scope/one', 'two'] })
  const [first, second] = await Promise.all([
    npmVersions(packages, context('npm')),
    npmVersions(packages, context('npm')),
  ])
  assert.deepEqual(first, values)
  assert.deepEqual(second, values)
  assert.equal(calls.length, 2)
  assert.equal(calls[0][0], 'https://npm.example.com/npm?package=%40scope%2Fone')
})

test('GitHub resolvers normalize source URLs and keep release and commit independent', async () => {
  responses.push(Response.json({ values: [{ text: 'v1' }] }), Response.json({ values: [{ text: 'abcdefg' }] }))
  const plugin = item({ source: 'https://github.com/owner/repo.git/tree/main' })
  await githubRelease(plugin, context('github'))
  await githubCommit(plugin, context('github'))
  assert.deepEqual(calls.map(([url]) => url), [
    'https://github.example.com/github/release?repo=owner%2Frepo',
    'https://github.example.com/github/commit?repo=owner%2Frepo',
  ])
})

test('resolver reports failures and lets a subsequent retry succeed', async () => {
  const plugin = item({ npmPackages: ['retry-package'] })
  responses.push(new Response(null, { status: 503 }), Response.json({ values: [{ text: '1.0.0' }] }))
  await assert.rejects(npmVersions(plugin, context('retry')), /503/)
  assert.deepEqual(await npmVersions(plugin, context('retry')), [{ text: '1.0.0' }])
})

test('resolver refreshes successful results after five minutes', async (t) => {
  let now = Date.now()
  t.mock.method(Date, 'now', () => now)
  responses.push(
    Response.json({ values: [{ text: '1.0.0' }] }),
    Response.json({ values: [{ text: '2.0.0' }] }),
  )
  const plugin = item({ npmPackages: ['expiring-package'] })
  assert.deepEqual(await npmVersions(plugin, context('expiry')), [{ text: '1.0.0' }])
  assert.deepEqual(await npmVersions(plugin, context('expiry')), [{ text: '1.0.0' }])
  assert.equal(calls.length, 1)
  now += 300_001
  assert.deepEqual(await npmVersions(plugin, context('expiry')), [{ text: '2.0.0' }])
  assert.equal(calls.length, 2)
})

test('resolver rejects missing configuration and malformed metadata', async () => {
  const plugin = item({ npmPackages: ['invalid-package'] })
  await assert.rejects(npmVersions(plugin, { options: {} }), /not configured/)
  for (const values of [
    [{ text: 123 }],
    [{ text: 'bad link', href: 'javascript:alert(1)' }],
    [{ text: 'bad date', date: 'yesterday' }],
  ]) {
    responses.push(Response.json({ values }))
    await assert.rejects(npmVersions(plugin, context('invalid')), /Invalid metadata API response/)
  }
  responses.push(Response.json({ values: [{ text: 'v1', date: '2026-11-01T12:00:00Z' }] }))
  assert.equal((await npmVersions(plugin, context('invalid'))).length, 1)
  assert.throws(() => githubRelease(item({ source: 'not a URL' }), context('source')), /Invalid source URL/)
  assert.throws(() => githubRelease(item({ source: 'https://github.com/owner' }), context('source')), /identify a repository/)
})
