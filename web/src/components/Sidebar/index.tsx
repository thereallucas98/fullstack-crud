import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react";
import { House, User, Users } from "phosphor-react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="geral">
          <NavLink icon={House}>Dashboard</NavLink>
          <NavLink icon={Users}>Usuários</NavLink>
        </NavSection>

        <NavSection title="Configurações">
          <NavLink icon={User}>Perfil</NavLink>
        </NavSection>
      </Stack>
    </Box>
  );
}
