export const FREE_COMPONENTS = ['Button', 'Card', 'Checkbox', 'Radio', 'Switch', 'Tabs', 'Divider', 'Tooltip']

export const HOW_IT_WORKS = [
  {
    title: 'Set up your brand & tokens',
    description:
      'Choose single or multi-brand, pick a token architecture (or let us pick for you), and choose what you’re building on — Tailwind, MUI, Mantine, or plain CSS.',
  },
  {
    title: 'Customize every component visually',
    description:
      'Variant, color, size, state — tune each component live in the builder and watch every brand update together.',
  },
  {
    title: 'Sync to Figma in one click',
    description:
      'Push resolved token values straight into Figma variables via the relay server, brand by brand, without touching what’s already there.',
  },
  {
    title: 'Launch a live Storybook',
    description:
      'Ship a hosted Storybook with every component, every token, and a brand switcher built in — so design and code never drift apart.',
  },
]

export const FEATURES = [
  {
    title: 'Multi-brand from day one',
    description: 'Shared component structure, independent palettes per brand — built for agencies and product suites alike.',
  },
  {
    title: 'Flexible token architecture',
    description: 'Two-tier, three-tier, flat, or bring your own naming — pick what fits, or let us recommend one.',
  },
  {
    title: 'Framework-agnostic',
    description: 'Export to Tailwind, MUI, Mantine, Chakra UI, plain CSS/Sass, or raw JSON for anything else.',
  },
  {
    title: 'Figma variable sync',
    description: 'One-click sync to Figma variables with safe-sync mode so you never wipe out variables you didn’t touch.',
  },
  {
    title: 'Hosted Storybook export',
    description: 'A live, shareable Storybook with every component and a brand switcher — generated, not hand-built.',
  },
  {
    title: 'Built for teams that iterate',
    description: 'Merge another designer’s brands from a file, export changes incrementally, keep everything in sync as you go.',
  },
]

export const PRICING_TIERS = [
  {
    key: 'free',
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    tagline: 'Try the full workflow on one brand.',
    features: [
      '1 brand',
      '8 core components',
      'Two-tier or three-tier token architecture',
      'Export tokens as JSON',
    ],
    cta: 'Get Started Free',
    badge: null,
  },
  {
    key: 'pro',
    name: 'Pro',
    price: '$24',
    cadence: '/mo',
    tagline: 'For one brand, fully synced.',
    features: [
      '1 brand',
      'Full component library — plus charts & future additions',
      'One-click Figma variable sync',
      'Hosted live Storybook',
      'Save 20% — $19/mo billed annually',
    ],
    cta: 'Start Pro',
    badge: null,
  },
  {
    key: 'team',
    name: 'Team',
    price: '$20',
    cadence: '/seat/mo · min 2 seats',
    tagline: 'For agencies and multi-brand systems.',
    features: [
      'Everything in Pro',
      'Unlimited brands',
      'Priority support',
      'Save 20% — $16/seat/mo billed annually',
    ],
    cta: 'Start Team',
    badge: 'Best for agencies',
  },
]

export const FAQS = [
  {
    question: 'Do I need to know how to code?',
    answer: 'No. The builder is fully visual — pick variants, colors, sizes, and states for each component. Code only shows up in what you export.',
  },
  {
    question: 'What if I already have a token architecture?',
    answer: 'Choose "Custom" during setup and name your own tiers, or import an existing token JSON file as your starting palette.',
  },
  {
    question: 'Which frameworks are supported?',
    answer: 'Tailwind CSS, MUI, Mantine, Chakra UI, and plain CSS/Sass are built in. You can also export raw tokens and wire them up yourself.',
  },
  {
    question: 'Can I manage multiple brands?',
    answer: 'Yes — Team plans support unlimited brands sharing the same component structure with independent palettes and token values.',
  },
  {
    question: 'How does Figma sync work?',
    answer: 'A relay server pushes your resolved token values into Figma variables. You choose which brands to push, and "safe sync" mode means variables you didn’t touch never get deleted.',
  },
  {
    question: 'Does this replace Figma or Storybook?',
    answer: 'No — it keeps both in sync with one source of truth. You still design in Figma and document in Storybook; this just generates and updates both for you.',
  },
  {
    question: 'What\'s included in the free plan?',
    answer: '1 brand, 8 core components (Button, Card, Checkbox, Radio, Switch, Tabs, Divider, Tooltip), and JSON token export — no time limit.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes — upgrade or downgrade anytime. Switching to Team just adds seats; you\'re billed pro-rated for the rest of the cycle.',
  },
]
