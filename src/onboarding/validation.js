// Brand names match when they are the same after trimming and lowercasing.
// Blank entries are incomplete, not duplicates of each other.
export function duplicateBrandIndexes(names) {
  const firstIndexByKey = new Map()
  const duplicates = new Set()
  names.forEach((name, index) => {
    const key = String(name ?? '').trim().toLowerCase()
    if (!key) return
    if (firstIndexByKey.has(key)) {
      duplicates.add(firstIndexByKey.get(key))
      duplicates.add(index)
    } else {
      firstIndexByKey.set(key, index)
    }
  })
  return duplicates
}

// Custom tiers are a comma-separated list. An empty string, or any empty /
// whitespace-only item after splitting (for example " , ,"), is rejected.
export function parseCustomTiers(value) {
  const raw = String(value ?? '')
  if (raw.trim().length === 0) {
    return { ok: false, tiers: [], reason: 'empty' }
  }
  const parts = raw.split(',')
  const tiers = []
  let junk = false
  for (const part of parts) {
    const trimmed = part.trim()
    if (trimmed.length === 0) junk = true
    else tiers.push(trimmed)
  }
  if (junk || tiers.length === 0) {
    return { ok: false, tiers, reason: 'junk' }
  }
  return { ok: true, tiers, reason: null }
}
