import { Flex, Input, Text, Icon, Box, Avatar } from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";
export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      alignItems="center"
    >
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashnet
        <Text as="span" ml="1" color="blue.500">
          .
        </Text>
      </Text>

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
          placeholder="Buscar na plataforma"
          _placeholder={{
            color: "gray.400",
          }}
        />
        <Icon as={MagnifyingGlass} fontSize="24" />
      </Flex>

      <Flex align="center" ml="auto">
        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>David Lucas</Text>
            <Text color="gray.300" fontSize="small">david.lucas@snet.com.br</Text>
          </Box>

          <Avatar size="md" name="David Lucas" />
        </Flex>
      </Flex>
    </Flex>
  );
}
