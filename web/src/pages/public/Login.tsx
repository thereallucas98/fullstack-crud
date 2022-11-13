import { Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { NavLink as RRLink } from "react-router-dom";

import { Input } from "../../components/Form/Input";

export function Login() {
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
        <Stack spacing="4">
          <Input type="email" name="email" label="E-mail" />
          <Input type="password" name="password" label="Senha" />
        </Stack>

        <Button type="submit" mt="6" colorScheme="blue" size="lg">
          Entrar
        </Button>

        <Link
          as={RRLink}
          to="/create-account"
          display="flex"
          mt="4"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="medium">
            Não posusi conta? Clique aqui
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
