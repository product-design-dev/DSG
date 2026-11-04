/**
 * Theme for DSG's own app chrome (landing, auth, onboarding).
 *
 * These are not the user-generated design-system tokens the generator
 * builds and previews. Nothing here reads or writes that pipeline.
 *
 * Headings are colored with the app token `--text-h` (src/index.css).
 * That token used to follow only `prefers-color-scheme`, so a light OS
 * preference left headings on the light-surface color (#08060d) while
 * Mantine still painted a dark surface (`defaultColorScheme="dark"`).
 * Map the token to the active Mantine color scheme instead.
 */
export function appCssVariablesResolver() {
  return {
    variables: {},
    light: {
      "--text-h": "#08060d",
    },
    dark: {
      "--text-h": "#f3f4f6",
    },
  };
}
