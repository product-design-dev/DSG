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

export const LIBRARIES = [
  {
    key: 'tailwind',
    title: 'Tailwind CSS',
    description: 'Tokens export as a Tailwind theme config.',
  },
  {
    key: 'mui',
    title: 'MUI',
    description: 'Tokens export as a Material UI theme object.',
  },
  {
    key: 'mantine',
    title: 'Mantine',
    description: 'Tokens export as a Mantine theme.',
  },
  {
    key: 'chakra',
    title: 'Chakra UI',
    description: 'Tokens export as a Chakra UI theme object.',
  },
  {
    key: 'css',
    title: 'Plain CSS / Sass',
    description: 'Tokens export as CSS custom properties or Sass variables — no framework dependency.',
  },
  {
    key: 'other',
    title: 'Other / Manual',
    description: 'Export raw token JSON and wire it up yourself.',
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
