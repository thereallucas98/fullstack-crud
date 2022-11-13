import { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../components/Form/Input";
import { Sidebar } from "../../components/Sidebar";
import { useCreateUserMutation } from "../../services/users.service";

type CreateUserFormData = {
  name: string;
  email: string;
  birthday: string;
  password: string;
  password_confirmation: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Nome obrigátorio"),
  email: Yup.string().required("E-mail obrigátorio").email("E-mail inválido"),
  birthday: Yup.string()
    .matches(/^(\d{2})\/(\d{2})\/(\d{4})$/, "Formato inválido")
    .required("Campo obrigatório"),
  password: Yup.string()
    .required("Senha obrigátoria")
    .min(6, "Mínimo 6 caracteres"),
  password_confirmation: Yup.string().oneOf(
    [null, Yup.ref("password")],
    "As senha precisam ser iguais"
  ),
});

export function CreateUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const [createUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();

  const handleCreateAccount: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    const user = {
      name: values.name,
      email: values.email,
      birthday: values.birthday,
      password: values.password,
    };

    createUser(user);
  };

  useEffect(() => {
    if (isSuccess) {
      window.alert("Usuário criado com sucesso");

      reset({
        name: "",
        email: "",
        birthday: "",
        password: "",
        password_confirmation: "",
      });
    }

    if (isError) {
      window.alert(
        "Ocorreu um problema no cadastro desse usuário. Fale com o seu administrador."
      );
    }
  }, [isSuccess, isError]);

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateAccount)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="text"
                label="Nome Completo"
                placeholder="Tony Stark"
                {...register("name")}
                error={errors.name}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="email"
                label="Email"
                placeholder="tony.stark@marvel.com.br"
                {...register("email")}
                error={errors.email}
              />
              <Input
                type="text"
                label="Data de nascimento"
                placeholder="06/12/1980"
                error={errors.birthday}
                maxLength={10}
                mask="date"
                {...register("birthday")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="password"
                label="Senha"
                placeholder="***********************"
                {...register("password")}
                error={errors.password}
              />
              <Input
                type="password"
                label="Confirmação da senha"
                placeholder="***********************"
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button
                variant="outline"
                colorScheme="blue"
                _hover={{
                  backgroundColor: "blue.900",
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                disabled={!isValid}
                isLoading={isLoading}
                type="submit"
              >
                Cadastrar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
