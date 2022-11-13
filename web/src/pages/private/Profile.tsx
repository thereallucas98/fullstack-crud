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
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import * as Yup from "yup";

import { Input } from "../../components/Form/Input";
import { Sidebar } from "../../components/Sidebar";

import { updateUserProfile } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { useUpdateAccountMutation } from "../../services/account.service";

type AccountFormData = {
  name: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
});

export function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AccountFormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const [updateAccount, { data, isLoading, isSuccess }] =
    useUpdateAccountMutation();

  const handleUpdateAccount: SubmitHandler<AccountFormData> = async (
    values
  ) => {
    updateAccount(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUserProfile({ name: data?.name! }));
    }
  }, [isSuccess, dispatch]);

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          as="form"
          onSubmit={handleSubmit(handleUpdateAccount)}
        >
          <Heading size="lg" fontWeight="normal">
            Editar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="text"
                label="Nome Completo"
                {...register("name")}
                error={errors.name}
                placeholder={user?.name}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="email"
                name="email"
                label="Email"
                placeholder={user?.email}
                isDisabled
              />
              <Input
                type="text"
                name="birthday"
                label="Data de nascimento"
                isDisabled
                placeholder={user?.birthday}
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
                  textColor: "white",
                }}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                disabled={!isValid}
                isLoading={isLoading}
              >
                Atualizar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
