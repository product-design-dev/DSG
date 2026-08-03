import TabsPreview from "../src/generator/components/previews/TabsPreview";
import { STORYBOOK_BRANDS } from "../src/generator/data/storybookBrands";
import CodeBlock from "./components/CodeBlock";

const VARIANT_MAP = {
  default: "default",
  outlined: "outline",
  pills: "pills",
};

function buildCode(args) {
  const mantineVariant = VARIANT_MAP[args.variant] || "default";
  const showIcons = args.showLeftIcon || args.showRightIcon;
  const iconImports = showIcons
    ? `import Image01Icon from "@untitledui-icons/react/line/Image01Icon";
import MessageCircle01Icon from "@untitledui-icons/react/line/MessageCircle01Icon";
import Settings01Icon from "@untitledui-icons/react/line/Settings01Icon";
`
    : "";
  const sectionProps = (iconTag) =>
    [
      args.showLeftIcon ? `leftSection={<${iconTag} size={14} />}` : null,
      args.showRightIcon ? `rightSection={<${iconTag} size={14} />}` : null,
    ]
      .filter(Boolean)
      .map((p) => ` ${p}`)
      .join("");
  const tabLines = `    <Tabs.Tab value="overview"${sectionProps("Image01Icon")}>Overview</Tabs.Tab>
    <Tabs.Tab value="details"${sectionProps("MessageCircle01Icon")}>Details</Tabs.Tab>
    <Tabs.Tab value="settings"${sectionProps("Settings01Icon")}>Settings</Tabs.Tab>`;
  const panelLines = args.showPanel
    ? `
  <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  <Tabs.Panel value="details">Details content</Tabs.Panel>
  <Tabs.Panel value="settings">Settings content</Tabs.Panel>`
    : "";
  return `import { Tabs } from "@mantine/core";
${iconImports}

<Tabs
  variant="${mantineVariant}"
  orientation="${args.orientation}"
  radius="${args.radius}"
>
  <Tabs.List>
${tabLines.replace(
    '<Tabs.Tab value="settings"',
    '<Tabs.Tab value="settings" disabled'
  )}
  </Tabs.List>
${panelLines}
</Tabs>`;
}

export default {
  title: "Components/Tabs",
  component: TabsPreview,
  argTypes: {
    variant: { control: "select", options: ["default", "outlined", "pills"] },
    radius: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    showPanel: { control: "boolean" },
    showLeftIcon: { control: "boolean" },
    showRightIcon: { control: "boolean" },
    interactive: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "default",
    radius: "sm",
    orientation: "horizontal",
    showPanel: false,
    showLeftIcon: false,
    showRightIcon: false,
    interactive: false,
    disabled: false,
  },
  render: (args, { globals }) => (
    <div>
      <TabsPreview
        brands={STORYBOOK_BRANDS}
        brandId={globals.brand || "theia"}
        variant={args.variant}
        radius={args.radius}
        orientation={args.orientation}
        showPanel={args.showPanel}
        showLeftIcon={args.showLeftIcon}
        showRightIcon={args.showRightIcon}
        interactive={args.interactive}
        state={args.disabled ? "disabled" : null}
      />
      <CodeBlock code={buildCode(args)} />
    </div>
  ),
};

export const Default = { args: { variant: "default" } };
export const Outlined = { args: { variant: "outlined" } };
export const Pills = { args: { variant: "pills" } };
export const Vertical = { args: { orientation: "vertical" } };
