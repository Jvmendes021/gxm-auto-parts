import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { siteConfig } from "./config/siteConfig";
import "./App.css";

const root = document.documentElement.style;
root.setProperty("--primary", siteConfig.colors.primary);
root.setProperty("--secondary", siteConfig.colors.secondary);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
