export const BRAND_MODES = [
  {
    key: 'single',
    title: 'Single Brand',
    description:
      'One brand, one token set. Best if you’re building a design system for a single product or company.',
  },
  {
    key: 'multi',
    title: 'Multiple Brands',
    description:
      'Shared component structure with brand-specific palettes. Best for agencies, platforms, or product suites running several brands on one system.',
  },
]

export const ARCHITECTURES = [
  {
    key: 'two-tier',
    title: 'Two-Tier',
    subtitle: 'Primitives → Semantic',
    description:
      'Raw color/size scales (e.g. blue/0–9) feed into purpose-driven aliases (interactive-primary, surface-danger). Components reference the semantic layer.',
  },
  {
    key: 'three-tier',
    title: 'Three-Tier',
    subtitle: 'Primitives → Semantic → Component',
    description:
      'Adds a component-scoped layer on top of semantics (button-filled-background), so each component can override aliases independently without touching shared tokens.',
  },
  {
    key: 'single-tier',
    title: 'Single-Tier',
    subtitle: 'Flat',
    description:
      'No aliasing layers — components reference raw values directly. Fastest to set up, less flexible for theming or rebranding later.',
  },
  {
    key: 'custom',
    title: 'Custom',
    subtitle: 'Bring your own',
    description:
      'Define your own tier names and depth. You’ll map your existing architecture during setup.',
  },
]

export const DEFAULT_LIBRARY = 'mantine'

export const LIBRARIES = [
  {
    key: 'tailwind',
    title: 'Tailwind CSS',
    description: 'Tailwind support is coming soon.',
    available: false,
  },
  {
    key: 'mui',
    title: 'MUI',
    description: 'MUI support is coming soon.',
    available: false,
  },
  {
    key: 'mantine',
    title: 'Mantine',
    description: 'Live component preview on Mantine, with Figma sync, Brands JSON, and Storybook.',
    available: true,
  },
  {
    key: 'chakra',
    title: 'Chakra UI',
    description: 'Chakra UI support is coming soon.',
    available: false,
  },
  {
    key: 'css',
    title: 'Plain CSS / Sass',
    description: 'Plain CSS and Sass support is coming soon.',
    available: false,
  },
  {
    key: 'other',
    title: 'Other / Manual',
    description: 'More foundations are coming soon.',
    available: false,
  },
]

export const STEPS = [
  { key: 'brand', label: 'Brand setup' },
  { key: 'names', label: 'Name brands' },
  { key: 'architecture', label: 'Token architecture' },
  { key: 'library', label: 'Foundation' },
  { key: 'review', label: 'Review' },
]

export function recommendArchitecture(brandMode) {
  return brandMode === 'multi' ? 'three-tier' : 'two-tier'
}

export function resolveArchitecture(answers) {
  const key = answers.architecture === 'auto' ? recommendArchitecture(answers.brandMode) : answers.architecture
  return ARCHITECTURES.find((a) => a.key === key)
}

export function stepIndexOf(key) {
  return STEPS.findIndex((s) => s.key === key)
}

export function normalizeLibraryKey(key) {
  if (typeof key !== 'string') return null
  const trimmed = key.trim()
  return trimmed || null
}

export function getLibrary(key) {
  const normalized = normalizeLibraryKey(key)
  if (!normalized) return null
  return LIBRARIES.find((lib) => lib.key === normalized.toLowerCase()) || null
}

export function isLibrarySelectable(key) {
  return getLibrary(key)?.available === true
}

export function foundationLabel(key) {
  return getLibrary(key)?.title || normalizeLibraryKey(key) || 'Not set'
}

export function resolveEffectiveLibrary(key) {
  if (isLibrarySelectable(key)) return getLibrary(key)
  return getLibrary(DEFAULT_LIBRARY)
}

const EMPTY_ANSWERS = {
  brandMode: null,
  brandNames: [''],
  architecture: null,
  customTiers: '',
  library: DEFAULT_LIBRARY,
}

export function hydrateAnswers(saved) {
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
    return { ...EMPTY_ANSWERS, brandNames: [''] }
  }

  const brandNames =
    Array.isArray(saved.brandNames) && saved.brandNames.length > 0
      ? saved.brandNames.map((name) => (name == null ? '' : String(name)))
      : ['']

  const libraryKey = normalizeLibraryKey(saved.library)
  const known = getLibrary(libraryKey)

  return {
    brandMode: typeof saved.brandMode === 'string' ? saved.brandMode : null,
    brandNames,
    architecture: typeof saved.architecture === 'string' ? saved.architecture : null,
    customTiers: typeof saved.customTiers === 'string' ? saved.customTiers : '',
    library: known ? known.key : libraryKey || DEFAULT_LIBRARY,
  }
}
