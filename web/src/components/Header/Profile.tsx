import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center" ml="auto">
      <Flex align="center">
        {showProfileData ? (
          <Box mr="4" textAlign="right">
            <Text>David Lucas</Text>
            <Text color="gray.300" fontSize="small">
              david.lucas@snet.com.br
            </Text>
          </Box>
        ) : null}

        <Avatar size="md" name="David Lucas" />
      </Flex>
    </Flex>
  );
}
