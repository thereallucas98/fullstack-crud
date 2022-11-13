import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Sidebar } from "../../components/Sidebar";
import { useAppSelector } from "../../redux/store";

export function Profile() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          <Heading size="lg" fontWeight="normal">
            Editar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="text"
                name="name"
                label="Nome Completo"
                placeholder={user?.name}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder={user?.email}
              />
              <Input
                type="text"
                name="birthday"
                label="Data de nascimento"
                placeholder={user?.birthday}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button
                variant="outline"
                colorScheme="blue"
                _hover={{
                  backgroundColor: "blue.900",
                  textColor: 'white'
                }}
              >
                Cancelar
              </Button>
              <Button colorScheme="blue">Atualizar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}