import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center" ml="auto">
      <Flex align="center">
        <Box mr="4" textAlign="right">
          <Text>David Lucas</Text>
          <Text color="gray.300" fontSize="small">
            david.lucas@snet.com.br
          </Text>
        </Box>

        <Avatar size="md" name="David Lucas" />
      </Flex>
    </Flex>
  );
}
