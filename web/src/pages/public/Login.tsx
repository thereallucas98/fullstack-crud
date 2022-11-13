import { Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink as RRLink } from "react-router-dom";

import * as Yup from "yup";

import { Input } from "../../components/Form/Input";
import { setCredentials } from "../../redux";
import { useAppDispatch } from "../../redux/store";
import { useLoginMutation } from "../../services/auth.service";

type LoginFormData = {
  email: string;
  password: string;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Informe um e-mail válido")
    .required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
});

export function Login() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [signIn, { isSuccess, isLoading, data }] = useLoginMutation();

  const handleSignIn: SubmitHandler<LoginFormData> = async (values) => {
    signIn(values);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.user && data?.token) {
        dispatch(setCredentials({ user: data.user, accessToken: data.token }));
      }
    }
  }, [isSuccess]);

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            label="E-mail"
            placeholder="tony.stark@marvel.com.br"
            {...register("email")}
            error={errors.email}
          />
          <Input
            type="password"
            label="Senha"
            placeholder="***********************"
            {...register("password")}
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
          Entrar
        </Button>

        <Link
          as={RRLink}
          to="/create-account"
          display="flex"
          mt="4"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="medium">Não posusi conta? Clique aqui</Text>
        </Link>
      </Flex>
    </Flex>
  );
}
