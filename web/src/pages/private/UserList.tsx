import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { PencilSimpleLine, Plus } from "phosphor-react";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="blue"
              leftIcon={<Icon as={Plus} />}
            >
              Criar usuário
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  Matricula
                </Th>
                <Th>Usuário</Th>
                {isWideVersion ? <Th>Data de cadastro</Th> : null}
                {isWideVersion ? <Th width="8"></Th> : null}
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4", "4", "6"]}>20171380013</Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">David Lucas</Text>
                    <Text fontSize="small" color="gray.300">
                      david.lucas@snet.com.br
                    </Text>
                  </Box>
                </Td>
                {isWideVersion ? <Td>04 de abril de 2021</Td> : null}
                {isWideVersion ? (
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="purple"
                      leftIcon={<Icon as={PencilSimpleLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                ) : null}
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
