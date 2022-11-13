import { Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { NavLink as RRLink } from "react-router-dom";

import { Input } from "../../components/Form/Input";

export function CreateAccount() {
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Link
        as={RRLink}
        to="/"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb="4"
      >
        <Text fontWeight="medium">Deseja voltar? Clique aqui</Text>
      </Link>
        <Stack spacing="4">
          <Input type="text" name="nome" label="Nome completo" />
          <Input type="email" name="email" label="E-mail" />
          <Input type="text" name="birthday" label="Data de Nascimento" />
          <Input type="password" name="password" label="Senha" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="blue" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
