import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { DarkModeProvider } from "./Hooks/DarkMode/DarkModeContext.tsx";
import { queryClient } from "./lib/react-query.tsx";

const clientID = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientID}>
      <BrowserRouter>
        <DarkModeProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </DarkModeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
