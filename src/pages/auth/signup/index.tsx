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
} from "@chakra-ui/react";
import Image from "next/image";

// Logo
import ProximaLogo from "@public/proxima/logo/proxima_logo_dark.svg";

interface signupForm {
  email: string;
  password: string;
}

interface Props {}

const Index: FC<Props> = (props) => {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  const handleSignup = async (formData: signupForm) => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      setIsSubmitting(false);
    } else {
      alert("Success! Please check your email for further instructions");
      handleLoginRedirect();
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
              Create your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">{"Already have an account?"}</Text>
              <Button
                variant="link"
                color={"proxima.orange"}
                onClick={handleLoginRedirect}
              >
                Login
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSignup}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <HStack width="full">
                  <FormControl>
                    <FormLabel htmlFor="name">First Name</FormLabel>
                    <Field
                      as={Input}
                      id="firstname"
                      name="firstname"
                      type="text"
                      isLoading={isSubmitting}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="name">Last Name</FormLabel>
                    <Field
                      as={Input}
                      id="lastname"
                      name="lastname"
                      type="text"
                      isLoading={isSubmitting}
                    />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    isLoading={isSubmitting}
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
                    isLoading={isSubmitting}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  bg={"proxima.orange"}
                  width="full"
                  mt={8}
                  isLoading={isSubmitting}
                >
                  Sign up
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
