import { Box, HStack, Text } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface NavItemProps {
  path: string;
  label: string;
  subtle?: boolean;
  active?: boolean;
  icon: ReactElement;
  endElement?: ReactElement;
  children?: ReactNode;
}

export const NavItem = (props: NavItemProps) => {
  const { active, icon, children, label, endElement, path } = props;

  const router = useRouter();

  const navigation = (page: string) => {
    router.push({ pathname: page });
  };

  return (
    <HStack
      as="a"
      onClick={() => navigation(path)}
      w="full"
      p={2}
      cursor="pointer"
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? "proxima.darkgray" : undefined}
      _hover={{ bg: "proxima.darkgray" }}
      _active={{ bg: "proxima.darkgray" }}
    >
      <Box fontSize={"md"} color={"proxima.white"}>
        {icon}
      </Box>
      <Text fontSize={"sm"} color={"proxima.white"}>
        {label}
      </Text>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  );
};
