import { useState } from "react";
import { Popover } from "@mantine/core";

function BackgroundPickerRow({ label, mapping, hex, brandColors, globalColors, onChange }) {
  const color = mapping?.color || "neutral";
  const index = Number.isFinite(Number(mapping?.index)) ? Number(mapping.index) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: "#909296", marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: hex,
            border: "1px solid #373A40",
            flexShrink: 0,
          }}
        />
        <select
          value={color}
          onChange={(e) => onChange({ color: e.target.value, index })}
          style={{
            flex: 1,
            background: "#1A1B1E",
            border: "1px solid #373A40",
            borderRadius: 4,
            color: "#C1C2C5",
            fontSize: 12,
            fontFamily: "monospace",
            padding: "5px 8px",
          }}
        >
          <optgroup label="Brand">
            {brandColors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </optgroup>
          <optgroup label="Global">
            {globalColors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </optgroup>
        </select>
        <select
          value={index}
          onChange={(e) => onChange({ color, index: Number.parseInt(e.target.value, 10) || 0 })}
          style={{
            width: 50,
            flexShrink: 0,
            background: "#1A1B1E",
            border: "1px solid #373A40",
            borderRadius: 4,
            color: "#C1C2C5",
            fontSize: 12,
            fontFamily: "monospace",
            padding: "5px 8px",
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function PreviewStage({
  children,
  label,
  padding = 32,
  gap = 16,
  contentAlignItems = "center",
  contentJustifyContent = "center",
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const previewTheme =
    typeof window !== "undefined" && window.__DSG_PREVIEW_THEME === "light" ? "light" : "dark";
  const previewBg = typeof window !== "undefined" ? window.__DSG_PREVIEW_BG : null;

  const background = previewBg
    ? (previewTheme === "light" ? previewBg.lightHex : previewBg.darkHex)
    : previewTheme === "light" ? "#F1F3F5" : "#181926";
  const labelColor = previewTheme === "light" ? "#495057" : "#868E96";

  return (
    <div
      style={{
        background,
        borderRadius: 8,
        padding,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 24,
        minHeight: "calc(100vh - 250px)",
        position: "relative",
      }}
    >
      {previewBg && (
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <Popover opened={pickerOpen} onChange={setPickerOpen} position="bottom-end" withArrow shadow="md">
            <Popover.Target>
              <button
                type="button"
                onClick={() => setPickerOpen((v) => !v)}
                title="Preview background color"
                aria-label="Preview background color"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: previewTheme === "light" ? previewBg.lightHex : previewBg.darkHex,
                  border: "2px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            </Popover.Target>
            <Popover.Dropdown style={{ background: "#25262B", border: "1px solid #373A40", padding: 12 }}>
              <div style={{ fontSize: 11, color: "#5C5F66", marginBottom: 8, maxWidth: 200 }}>
                Sets the preview canvas background for every component, for this brand.
              </div>
              <BackgroundPickerRow
                label="Light mode"
                mapping={previewBg.light}
                hex={previewBg.lightHex}
                brandColors={previewBg.brandColors}
                globalColors={previewBg.globalColors}
                onChange={(mapping) => previewBg.onUpdate("light", mapping)}
              />
              <BackgroundPickerRow
                label="Dark mode"
                mapping={previewBg.dark}
                hex={previewBg.darkHex}
                brandColors={previewBg.brandColors}
                globalColors={previewBg.globalColors}
                onChange={(mapping) => previewBg.onUpdate("dark", mapping)}
              />
            </Popover.Dropdown>
          </Popover>
        </div>
      )}
      {label && (
        <div style={{ fontSize: 13, fontFamily: "monospace", color: labelColor, marginBottom: 16 }}>
          {label}
        </div>
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: contentAlignItems,
          justifyContent: contentJustifyContent,
          gap,
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
