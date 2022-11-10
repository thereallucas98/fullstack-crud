import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react";
import { House, User, Users } from "phosphor-react";

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text
            fontWeight="bold"
            color="gray.400"
            fontSize="small"
            textTransform="uppercase"
          >
            Geral
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link display="flex" alignItems="center">
              <Icon as={House} fontSize="20" />
              <Text ml="4" fontWeight="medium">Dashboard</Text>
            </Link>
            <Link display="flex" alignItems="center">
              <Icon as={Users} fontSize="20" />
              <Text ml="4" fontWeight="medium"> Usuários</Text>
            </Link>
          </Stack>
        </Box>
        <Box>
          <Text
            fontWeight="bold"
            color="gray.400"
            fontSize="small"
            textTransform="uppercase"
          >
            Configurações
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link display="flex" alignItems="center">
              <Icon as={User} fontSize="20" />
              <Text ml="4" fontWeight="medium">Perfil</Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
