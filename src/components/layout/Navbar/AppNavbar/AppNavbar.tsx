import { FC } from "react";

import { Flex, HStack, Text } from "@chakra-ui/react";

interface AppNavbarProps {
  text: string;
}

const AppNavbar: FC<AppNavbarProps> = ({ text }) => {
  return (
    <Flex
      boxShadow="sm"
      h="4.75rem"
      px="1.125rem"
      py=".875rem"
      justify="space-between"
      bg={"proxima.white"}
    >
      <HStack spacing="6">
        <Text fontWeight="bold" fontSize="xl" color={"proxima.black"}>
          {text}
        </Text>
      </HStack>
    </Flex>
  );
};
export default AppNavbar;
