// React
import React, { FC, useState } from "react";

// Supabase
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/database.types";

// Form
import { Formik, Field } from "formik";

// Chakra
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Center,
  Flex,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import Image from "next/image";

// Logo
import ProximaLogo from "@public/proxima/logo/proxima_logo_dark.svg";

interface loginForm {
  email: string;
  password: string;
}

interface Props {}

const Index: FC<Props> = (props) => {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSignupRedirect = () => {
    router.push("/auth/signup");
  };

  const handleLogin = async (formData: loginForm) => {
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      setIsSubmitting(false);
    } else {
      router.push("/apps/home");
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={{ base: "transparent", sm: "bg-surface" }}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "xl" }}
        w={"lg"}
      >
        <Stack spacing="4" mb={8}>
          <Center>
            <Image src={ProximaLogo} alt="Proxima Logo" />
          </Center>
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center" pb={2}>
              <Text color="muted">{"Don't have an account?"}</Text>
              <Button
                variant="link"
                color={"proxima.orange"}
                onClick={handleSignupRedirect}
              >
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleLogin}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    validate={(value: string) => {
                      let error;
                      if (value.length < 6) {
                        error = "Password must contain at least 6 characters";
                      }
                      return error;
                    }}
                    disabled={isSubmitting}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Field
                  as={Checkbox}
                  id="rememberMe"
                  name="rememberMe"
                  disabled={isSubmitting}
                >
                  Remember me?
                </Field>
                <Button
                  type="submit"
                  bg={"proxima.orange"}
                  width="full"
                  mt={8}
                  isLoading={isSubmitting}
                >
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
export default Index;
