import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // tailwind + bootstrap import lives here

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
