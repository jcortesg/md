import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider }  from "./provider/authProvider";

import { Router } from "./routes/index.tsx";
import { theme } from "./core/theme.ts";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
        <AuthProvider >
      <Router />
      </AuthProvider>
    </CssVarsProvider>
  </StrictMode>,
);