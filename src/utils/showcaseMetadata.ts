// Adapted from homotechsual/docusaurus-plugin-showcase, demo/src/lib/metadata-resolvers.ts.
// SPDX-License-Identifier: Apache-2.0
import type {
  ComputedFieldContext,
  ComputedFieldResolver,
  ComputedFieldValue,
} from '@homotechsual/docusaurus-plugin-showcase'

const requests = new Map<string, { expires: number; promise: Promise<ComputedFieldValue[]> }>()

function isValue(value: unknown): value is ComputedFieldValue {
  return !!value && typeof value === 'object' &&
    'text' in value && typeof value.text === 'string' &&
    (!('href' in value) || (typeof value.href === 'string' && /^https?:\/\//i.test(value.href))) &&
    (!('date' in value) || (typeof value.date === 'string' && Number.isFinite(Date.parse(value.date))))
}

function metadata(path: string, context: ComputedFieldContext): Promise<ComputedFieldValue[]> {
  const endpoint = context.options.endpoint
  if (typeof endpoint !== 'string' || !endpoint) throw new Error('Metadata API endpoint is not configured.')
  const url = new URL(path, `${endpoint.replace(/\/$/, '')}/`).href
  const cached = requests.get(url)
  if (cached && cached.expires > Date.now()) return cached.promise
  const promise = fetch(url, { signal: AbortSignal.timeout(15_000) }).then(async (response) => {
    if (!response.ok) throw new Error(`Metadata API request failed (${response.status}).`)
    const body: unknown = await response.json()
    if (!body || typeof body !== 'object' || !('values' in body) ||
      !Array.isArray(body.values) || !body.values.every(isValue)) {
      throw new Error('Invalid metadata API response.')
    }
    return body.values
  }).catch((error: unknown) => {
    requests.delete(url)
    throw error
  })
  requests.set(url, { expires: Date.now() + 300_000, promise })
  return promise
}

function repository(source: string | null | undefined): string | null {
  if (!source) return null
  let url: URL
  try {
    url = new URL(source)
  } catch {
    throw new Error('Invalid source URL.')
  }
  if (url.hostname !== 'github.com') return null
  const parts = url.pathname.split('/').filter(Boolean)
  if (parts.length < 2) throw new Error('GitHub source URL must identify a repository.')
  return `${parts[0]}/${parts[1].replace(/\.git$/, '')}`
}

export const npmVersions: ComputedFieldResolver = async (item, context) => {
  if (!item.npmPackages?.length) return null
  return (await Promise.all(item.npmPackages.map((name) =>
    metadata(`npm?package=${encodeURIComponent(name)}`, context)))).flat()
}

export const githubRelease: ComputedFieldResolver = (item, context) => {
  const repo = repository(item.source)
  return repo ? metadata(`github/release?repo=${encodeURIComponent(repo)}`, context) : null
}

export const githubCommit: ComputedFieldResolver = (item, context) => {
  const repo = repository(item.source)
  return repo ? metadata(`github/commit?repo=${encodeURIComponent(repo)}`, context) : null
}
