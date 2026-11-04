import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { appCssVariablesResolver } from "./appTheme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider
      defaultColorScheme="dark"
      cssVariablesResolver={appCssVariablesResolver}
    >
      <App />
    </MantineProvider>
  </StrictMode>,
);
