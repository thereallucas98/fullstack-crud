import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/store'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <Flex align="center" ml="auto">
      <Flex align="center">
        {showProfileData ? (
          <Box mr="4" textAlign="right">
            <Text>{user?.name}</Text>
            <Text color="gray.300" fontSize="small">
              {user?.email}
            </Text>
          </Box>
        ) : null}

        <Avatar size="md" name={user?.name} />
      </Flex>
    </Flex>
  )
}
