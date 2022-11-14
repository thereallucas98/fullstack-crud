import { useCallback, useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import { Link as RRLink } from 'react-router-dom'
import { PencilSimpleLine, Plus, TrashSimple } from 'phosphor-react'

import { SubmitHandler, useForm } from 'react-hook-form'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { Input } from '../../components/Form/Input'

import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../services/users.service'

import { useHeader } from '../../contexts/HeaderContext'
import { useGetUserList } from '../../hooks/useGetUserList'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { serverApi } from '../../api/server.service'

type UpdateFormData = {
  name: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
})

export function UserList() {
  const userLogged = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()

  const [idSelectedToDelete, setIdSelectedToDelete] = useState('')
  const [idSelectedToEdit, setIdSelectedToEdit] = useState('')

  const { value } = useHeader()

  /**
   * Update Form
   */

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<UpdateFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  /**
   * Following some discussion in the main documentation: https://github.com/chakra-ui/chakra-ui/discussions/3378
   * it was recommended to use and import useDisclosure and create it owns modal constants
   * but I rather to change in the future to use contexts.
   */
  const editModal = useDisclosure()
  const deleteModal = useDisclosure()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const { users, loadingUsers } = useGetUserList({ q: value })

  const {
    data: userData,
    isFetching: isFetchingUser,
    isLoading: isLoadingUser,
  } = useGetUserQuery({ id: idSelectedToEdit })

  /**
   * Edit User Wrapper
   */

  const [
    updateUser,
    { isSuccess: isUpdateUserSuccess, isLoading: isUpdateUserLoading },
  ] = useUpdateUserMutation()

  const handleOpenModalToEditUser = useCallback(
    (id: string) => {
      setIdSelectedToEdit(id)
      editModal.onOpen()
    },
    [editModal],
  )

  const handleUpdateUser: SubmitHandler<UpdateFormData> = async (values) => {
    updateUser({ id: idSelectedToEdit, name: values.name })
  }

  useEffect(() => {
    if (isUpdateUserSuccess) {
      editModal.onClose()
      setIdSelectedToEdit('')
      window.location.reload()
    }
  }, [isUpdateUserSuccess, dispatch, editModal])

  /**
   * Delete User Wrapepr
   */
  const [
    deleteUser,
    { isSuccess: isDeleteUserSuccess, isLoading: isDeleteUserLoading },
  ] = useDeleteUserMutation()

  const handleOpenModalToDeleteUser = useCallback(
    (id: string) => {
      setIdSelectedToDelete(id)

      if (!isFetchingUser || !isLoadingUser) {
        deleteModal.onOpen()
      }
    },
    [deleteModal, isFetchingUser, isLoadingUser],
  )

  const handleDeleteUserById = useCallback(() => {
    deleteUser({ id: idSelectedToDelete })
  }, [deleteUser, idSelectedToDelete])

  useEffect(() => {
    if (isDeleteUserSuccess) {
      console.log('oi delete users')
      deleteModal.onClose()
      setIdSelectedToDelete('')
      window.location.reload()
    }
  }, [isDeleteUserSuccess, deleteModal, dispatch])

  /**
   * First rendering
   */
  useEffect(() => {
    dispatch(serverApi.util.invalidateTags(['Users']))
  }, [dispatch])

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

          {loadingUsers ? (
            <Box alignItems="center" justifyContent="center">
              <Text textAlign="center" fontWeight="bold" fontSize="2xl">
                Carregando os dados
              </Text>
            </Box>
          ) : (
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={['4', '4', '6']} color="gray.300" width="8">
                    Matricula
                  </Th>
                  <Th>Usuário</Th>
                  {isWideVersion ? <Th>Data de cadastro</Th> : null}
                  {isWideVersion ? <Th width="8"></Th> : null}
                </Tr>
              </Thead>
              <Tbody>
                {users?.map((user) => (
                  <Tr key={user.id}>
                    <Td px={['4', '4', '6']}>{user.registry}</Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">{user.name}</Text>
                        <Text fontSize="small" color="gray.300">
                          {user.email}
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion ? <Td>{user.birthday}</Td> : null}
                    {isWideVersion && user.id !== userLogged?.id ? (
                      <Td flexDirection="row">
                        <Button
                          as="button"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          onClick={() => handleOpenModalToEditUser(user.id)}
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
                          onClick={() => handleOpenModalToDeleteUser(user.id)}
                        >
                          <Icon as={TrashSimple} />
                        </Button>
                      </Td>
                    ) : (
                      <Td flexDirection="row"></Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
          <Pagination />
        </Box>
      </Flex>
      {/* MODAL EDITING */}
      <Modal isOpen={editModal.isOpen} onClose={editModal.onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleUpdateUser)}>
          <ModalHeader>Editar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              type="text"
              label="Nome Completo"
              placeholder={userData?.name}
              {...register('name')}
              error={errors.name}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={editModal.onClose}
              variant="outline"
              colorScheme="blue"
              _hover={{ backgroundColor: 'gray.700' }}
              mr={3}
            >
              Fechar
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isUpdateUserLoading}
              disabled={!isValid}
            >
              Atualizar
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
            <Button
              mr={3}
              onClick={deleteModal.onClose}
              variant="outline"
              colorScheme="blue"
              _hover={{ backgroundColor: 'gray.700' }}
            >
              Fechar
            </Button>
            <Button colorScheme="blue" onClick={handleDeleteUserById}>
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
