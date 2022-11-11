import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./styles/theme";

import App from "./App";
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <App />
      </SidebarDrawerProvider>
    </ChakraProvider>
  </React.StrictMode>
);
