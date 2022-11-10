import { Button, Flex, Input, Stack, FormLabel } from "@chakra-ui/react";

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
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            focusBorderColor="blue.500"
            bgColor="gray.900"
            variant="filled"
            _hover={{
              bgColor: "gray.900",
            }}
            size="lg"
          />

          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            focusBorderColor="blue.500"
            bgColor="gray.900"
            variant="filled"
            _hover={{
              bgColor: "gray.900",
            }}
            size="lg"
          />
        </Stack>

        <Button type="submit" mt="6" colorScheme="blue" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
