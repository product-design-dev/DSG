// Checks that figma-plugin/code.js's hand-maintained `managedKeys` component
// list hasn't drifted from src/generator/data/componentTokens.js — the
// single source of truth the rest of the app uses. The Figma plugin runs in
// a sandboxed environment with no bundler, so it can't import componentTokens.js
// directly; this script is the next best thing: a manual (or CI) check that
// fails loudly instead of the two lists silently going out of sync.
//
// Usage: npm run check:figma-plugin-sync
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { COMPONENT_NAMES } from "../src/generator/data/componentTokens.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");

// Mirrors figma-plugin/code.js's normalizeComponentKey(): lowercase, letters only.
function normalizeComponentKey(name) {
  return String(name || "").toLowerCase().replace(/[^a-z]/g, "");
}

const codeJsPath = join(PROJECT_ROOT, "figma-plugin", "code.js");
const codeJs = readFileSync(codeJsPath, "utf-8");

const managedKeysMatch = codeJs.match(/var managedKeys = \[([\s\S]*?)\];/);
if (!managedKeysMatch) {
  console.error("Could not find `var managedKeys = [...]` in figma-plugin/code.js — has it been renamed?");
  process.exit(1);
}
const managedKeys = Array.from(managedKeysMatch[1].matchAll(/"([^"]+)"/g)).map((m) => m[1]);

// "docs" isn't a renderable component (it's the generated documentation
// page), so it's expected on neither side.
const expected = new Set(
  COMPONENT_NAMES.filter((n) => n !== "docs").map(normalizeComponentKey)
);
const actual = new Set(managedKeys.map(normalizeComponentKey));

// Known intentional 1-to-many exceptions: one componentTokens.js group maps
// to multiple Figma component sets that share its tokens.
const PLUGIN_ONLY_SUBCOMPONENTS = new Set(["accordionitem"]); // built from accordion-* tokens
for (const key of PLUGIN_ONLY_SUBCOMPONENTS) actual.delete(key);

const missingFromPlugin = [...expected].filter((k) => !actual.has(k));
const extraInPlugin = [...actual].filter((k) => !expected.has(k));

if (missingFromPlugin.length === 0 && extraInPlugin.length === 0) {
  console.log(`OK — figma-plugin/code.js managedKeys matches COMPONENT_NAMES (${actual.size} components).`);
  process.exit(0);
}

if (missingFromPlugin.length > 0) {
  console.error("Components in componentTokens.js but missing from figma-plugin/code.js managedKeys:");
  console.error("  " + missingFromPlugin.join(", "));
}
if (extraInPlugin.length > 0) {
  console.error("Components in figma-plugin/code.js managedKeys but not in componentTokens.js:");
  console.error("  " + extraInPlugin.join(", "));
}
process.exit(1);
