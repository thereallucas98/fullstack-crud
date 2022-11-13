import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { NavLink as RRLink } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../../components/Form/Input'
import { useCreateAccountMutation } from '../../services/auth.service'
import { useEffect } from 'react'

type CreateAccountFormData = {
  name: string
  email: string
  birthday: string
  password: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('Campo obrigatório'),
  birthday: Yup.string()
    .matches(/^(\d{2})\/(\d{2})\/(\d{4})$/, 'Formato inválido')
    .required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
})

export function CreateAccount() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateAccountFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const [createUser, { isSuccess, isLoading }] = useCreateAccountMutation()

  const handleCreateAccount: SubmitHandler<CreateAccountFormData> = async (
    values,
  ) => {
    createUser(values)
  }

  useEffect(() => {
    if (isSuccess) {
      onOpen()
    }
  }, [isSuccess, onOpen])

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        bg="gray.800"
        p="8"
        flexDir="column"
        borderRadius={8}
        maxWidth={360}
        onSubmit={handleSubmit(handleCreateAccount)}
      >
        <Link
          as={RRLink}
          to="/"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb="4"
        >
          <Text fontWeight="medium">Deseja voltar? Clique aqui</Text>
        </Link>
        <Stack spacing="4">
          <Input
            type="text"
            label="Nome completo"
            placeholder="Tony Stark"
            {...register('name')}
            error={errors.name}
          />
          <Input
            type="email"
            label="E-mail"
            placeholder="tony.stark@marvel.com.br"
            {...register('email')}
            error={errors.email}
          />
          <Input
            type="text"
            label="Data de Nascimento"
            placeholder="06/12/1980"
            error={errors.birthday}
            maxLength={10}
            mask="date"
            {...register('birthday')}
          />
          <Input
            type="password"
            label="Senha"
            placeholder="***********************"
            {...register('password')}
            error={errors.password}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          disabled={!isValid}
          isLoading={isLoading}
        >
          Criar conta
        </Button>
      </Flex>

      {/* SUCCESS MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Conta criada com sucesso</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>
              Sua conta foi criada, basta agora logar para aproveitar nossa
              plataforma
            </Text>
          </ModalBody>

          <ModalFooter>
            <Link
              as={RRLink}
              to="/"
              display="flex"
              mt="4"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontWeight="medium">Clique aqui para fazer login</Text>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
