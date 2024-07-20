import { FC } from "react";

import { useRouter } from "next/router";

import { Flex, HStack, Text, IconButton } from "@chakra-ui/react";

import { FaX } from "react-icons/fa6";

interface Props {
  text: string;
  accountId: string;
}

const ContactNavbar: FC<Props> = ({ text, accountId }) => {
  const router = useRouter();
  const handleClose = async () => {
    await router.push(`/apps/${accountId}/collections/contact`);
  };

  return (
    <Flex minH={"5vh"} p={4} justify="space-between" bg={"proxima.black"}>
      <HStack spacing="4">
        <Text fontWeight="medium" fontSize="lg" color={"proxima.white"}>
          {text}
        </Text>
      </HStack>
      <HStack spacing="2">
        <IconButton
          size="xs"
          colorScheme={"orange"}
          aria-label="Close"
          icon={<FaX />}
          onClick={handleClose}
        />
      </HStack>
    </Flex>
  );
};
export default ContactNavbar;
