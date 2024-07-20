import { FC } from "react";
import { useRouter } from "next/router";

import { Flex, HStack, Text, IconButton } from "@chakra-ui/react";

import { FaX } from "react-icons/fa6";

interface Props {
  text: string;
}

const CampaignNavbar: FC<Props> = ({ text }) => {
  const router = useRouter();

  const handleClose = async () => {
    router.back();
  };

  return (
    <Flex
      boxShadow="sm"
      minH={"4.75rem"}
      px="1.125rem"
      py=".875rem"
      justify="space-between"
      bg={"proxima.black"}
    >
      <HStack spacing="4">
        <Text fontWeight="medium" fontSize="lg" color={"proxima.white"}>
          {text}
        </Text>
      </HStack>
      <HStack spacing="2">
        <IconButton
          size="sm"
          colorScheme={"orange"}
          aria-label="Close"
          onClick={handleClose}
          icon={<FaX />}
        />
      </HStack>
    </Flex>
  );
};
export default CampaignNavbar;
