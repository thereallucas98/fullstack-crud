import { Stack } from "@chakra-ui/react";
import { House, User, Users } from "phosphor-react";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="geral">
        <NavLink icon={House}>Dashboard</NavLink>
        <NavLink icon={Users}>Usuários</NavLink>
      </NavSection>

      <NavSection title="Configurações">
        <NavLink icon={User}>Perfil</NavLink>
      </NavSection>
    </Stack>
  );
}
