import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RRLink } from "react-router-dom";
import { PencilSimpleLine, Plus, TrashSimple } from "phosphor-react";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";

export function UserList() {
  /**
   * Following some discussion in the main documentation: https://github.com/chakra-ui/chakra-ui/discussions/3378
   * it was recommended to use and import useDisclosure and create it owns modal constants
   * but I rather to change in the future to use contexts.
   */
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

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
              as={RRLink}
              fontSize="sm"
              colorScheme="blue"
              leftIcon={<Icon as={Plus} />}
              to="/users/create"
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
                  <Td flexDirection="row">
                    <Button
                      as="button"
                      size="sm"
                      fontSize="sm"
                      colorScheme="purple"
                      onClick={editModal.onOpen}
                      mb="2"
                    >
                      <Icon as={PencilSimpleLine} />
                    </Button>

                    <Button
                      as="button"
                      size="sm"
                      fontSize="sm"
                      colorScheme="purple"
                      alignItems="center"
                      justifyContent="center"
                      onClick={deleteModal.onOpen}
                    >
                      <Icon as={TrashSimple} />
                    </Button>
                  </Td>
                ) : null}
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
      {/* MODAL EDITING */}
      <Modal isOpen={editModal.isOpen} onClose={editModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input type="text" name="name" label="Nome Completo" />
            <Input type="text" name="birthday" label="Data de nascimento" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Atualizar
            </Button>
            <Button
              onClick={editModal.onClose}
              variant="outline"
              colorScheme="blue"
              _hover={{ backgroundColor: "gray.700" }}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* MODAL DELETING */}
      <Modal isOpen={deleteModal.isOpen} onClose={deleteModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>Você está prestes a deletar esse usuário</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Deletar
            </Button>
            <Button
              onClick={deleteModal.onClose}
              variant="outline"
              colorScheme="blue"
              _hover={{ backgroundColor: "gray.700" }}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
