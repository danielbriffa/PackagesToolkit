import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const changelogPath = resolve(root, 'docs/CHANGE_LOG.md')
const versionPath = resolve(root, 'version.json')
const packagePath = resolve(root, 'package.json')

// ── Parse changelog ────────────────────────────────────────────────────────

const changelog = readFileSync(changelogPath, 'utf-8')
const lines = changelog.split('\n')

const unreleasedIndex = lines.findIndex(l => l.trim() === '## Unreleased')
if (unreleasedIndex === -1) {
  console.error('No "## Unreleased" section found in CHANGE_LOG.md')
  process.exit(1)
}

const nextSectionIndex = lines.findIndex((l, i) => i > unreleasedIndex && l.startsWith('## '))
const unreleasedLines = lines.slice(unreleasedIndex + 1, nextSectionIndex === -1 ? undefined : nextSectionIndex)
const unreleasedContent = unreleasedLines.join('\n').trim()

if (!unreleasedContent) {
  console.error('The "## Unreleased" section is empty — nothing to release.')
  process.exit(1)
}

// ── Determine bump type ────────────────────────────────────────────────────

const changeTypes = unreleasedLines
  .filter(l => l.startsWith('ChangeType:'))
  .map(l => l.replace('ChangeType:', '').trim())

let bumpType = 'patch'
if (changeTypes.some(t => t.includes('💥'))) bumpType = 'major'
else if (changeTypes.some(t => t.includes('🌟'))) bumpType = 'minor'

// ── Calculate new version ──────────────────────────────────────────────────

const versionJson = JSON.parse(readFileSync(versionPath, 'utf-8'))
let { major, minor, patch } = versionJson

if (bumpType === 'major') { major++; minor = 0; patch = 0 }
else if (bumpType === 'minor') { minor++; patch = 0 }
else { patch++ }

const newVersion = `${major}.${minor}.${patch}`

// ── Update version.json ────────────────────────────────────────────────────

writeFileSync(versionPath, JSON.stringify({ major, minor, patch }, null, 4) + '\n')

// ── Update package.json ────────────────────────────────────────────────────

const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
pkg.version = newVersion
writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n')

// ── Update CHANGE_LOG.md ───────────────────────────────────────────────────

const date = new Date().toISOString();
const before = lines.slice(0, unreleasedIndex).join('\n')
const after = nextSectionIndex === -1 ? '' : lines.slice(nextSectionIndex).join('\n')

const newChangelog = [
  before,
  '## Unreleased\n',
  `## v${newVersion} — ${date}`,
  unreleasedContent,
  '',
  after,
].join('\n').replace(/\n{3,}/g, '\n\n')

writeFileSync(changelogPath, newChangelog)

// ── Output for GitHub Actions ──────────────────────────────────────────────

console.log(`Bumped to v${newVersion} (${bumpType})`)

const githubOutput = process.env.GITHUB_OUTPUT
if (githubOutput) {
  appendFileSync(githubOutput, `version=${newVersion}\n`)
  appendFileSync(githubOutput, `release_notes<<RELEASE_NOTES_EOF\n${unreleasedContent}\nRELEASE_NOTES_EOF\n`)
}
