import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { AuthContextProvider } from "context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </MantineProvider>
);
