import { useRef, useState } from 'react'
import { LIBRARIES, resolveArchitecture } from './content'
import './mock-builder.css'

const SWATCH_SCALES = {
  blue: ['#eef3fd', '#cddcf8', '#9bb9f1', '#6996ea', '#3b6fe8', '#2f5ac0', '#244498', '#1a3170', '#102049', '#070f24'],
  red: ['#fdeceb', '#f7c6c2', '#ef9189', '#e65d52', '#dc382b', '#b32d23', '#8a221b', '#621712', '#3a0d09', '#190402'],
  green: ['#e9f9ee', '#bdedce', '#86dba8', '#4fc982', '#2bb567', '#229254', '#196f40', '#104c2c', '#082918', '#020e06'],
}

const COMPONENT_LIST = [
  'Button', 'ActionIcon', 'Tabs', 'Accordion', 'Switch', 'Burger', 'SegmentedControl',
  'Checkbox', 'Radio', 'Chip', 'Slider', 'RangeSlider', 'Card', 'Notification', 'Popover',
  'Menu', 'Divider', 'List', 'Tooltip',
]

export default function MockBuilder({ answers, onStartOver }) {
  const arch = resolveArchitecture(answers)
  const lib = LIBRARIES.find((l) => l.key === answers.library)
  const names = answers.brandNames.filter(Boolean)
  const activeBrand = names[0] || 'Default'
  const otherBrands = names.slice(1)

  const [primitivesState, setPrimitivesState] = useState('empty')
  const [importedFileName, setImportedFileName] = useState(null)
  const fileInputRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      setImportedFileName(file.name)
      setPrimitivesState('imported')
    }
  }

  return (
    <div className="mock-builder">
      <div className="mock-banner">
        <span>
          Prototype preview — {arch?.title} tokens on <strong>{lib?.title}</strong>. The real builder loads here.
        </span>
        <button type="button" className="link-btn" onClick={onStartOver}>
          Start over
        </button>
      </div>

      <header className="mock-top-bar">
        <span className="mock-app-title">Design System Generator</span>
        <div className="mock-top-actions">
          <span className="mock-toggle-label">Light</span>
          <span className="mock-toggle" />
          <span className="mock-toggle-label">Dark</span>
          <button type="button" className="btn btn-ghost btn-small">
            Preview
          </button>
          <button type="button" className="btn btn-primary btn-small">
            Export
          </button>
        </div>
      </header>

      <div className="mock-body">
        <aside className="mock-sidebar mock-sidebar--left">
          <span className="label-caps">Brand</span>
          <div className="mock-select">{activeBrand}</div>
          {otherBrands.length > 0 && (
            <span className="mock-other-brands">+{otherBrands.length} more brand{otherBrands.length > 1 ? 's' : ''}</span>
          )}

          <span className="label-caps mock-section-gap">Primitives — {activeBrand}</span>

          {primitivesState === 'empty' && (
            <>
              <p className="mock-empty-note">
                New brands start with no brand color palettes — semantics point at shared global primitives until
                you add your own (e.g. blue) with + Add color, then map tokens to those names.
              </p>
              <div className="mock-empty-actions">
                <button type="button" className="link-btn" onClick={() => setPrimitivesState('started')}>
                  + Add color
                </button>
                <button type="button" className="link-btn" onClick={() => fileInputRef.current?.click()}>
                  Import tokens
                </button>
              </div>
            </>
          )}

          {primitivesState === 'imported' && (
            <p className="mock-empty-note">
              Imported from <strong>{importedFileName}</strong> — shown below as a starter palette.
            </p>
          )}

          {primitivesState !== 'empty' &&
            Object.entries(SWATCH_SCALES).map(([name, scale]) => (
              <div key={name} className="mock-swatch-row">
                <span className="mock-swatch-name">{name}</span>
                <div className="mock-swatch-strip">
                  {scale.map((color, i) => (
                    <span key={i} className="mock-swatch" style={{ background: color }} />
                  ))}
                </div>
              </div>
            ))}

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="mock-hidden-input"
            onChange={handleFileChange}
          />
        </aside>

        <main className="mock-canvas">
          <span className="label-caps">Properties</span>
          <div className="mock-preview-surface">
            <button type="button" className="mock-preview-button">
              Button
            </button>
          </div>
        </main>

        <aside className="mock-sidebar mock-sidebar--right">
          <span className="label-caps">Foundations</span>
          <div className="mock-list-item">Foundations</div>
          <span className="label-caps mock-section-gap">Components</span>
          {COMPONENT_LIST.map((name, i) => (
            <div key={name} className={`mock-list-item ${i === 0 ? 'mock-list-item--active' : ''}`}>
              {name}
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
