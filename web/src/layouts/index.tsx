import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Header } from "../components/Header";

export function DefaultLayout() {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
}