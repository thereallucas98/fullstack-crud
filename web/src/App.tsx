import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext";
import { Routes } from "./routes";
import { theme } from "./styles/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}

export default App;
