import { Flex, Icon, Input } from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";

import { useHeader } from "../../contexts/HeaderContext";

export function SearchBox() {
  const { changeValue } = useHeader();

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma por um usuário"
        _placeholder={{
          color: "gray.400",
        }}
        onChange={(e) => changeValue(e.target.value)}
      />
      <Icon as={MagnifyingGlass} fontSize="24" />
    </Flex>
  );
}
