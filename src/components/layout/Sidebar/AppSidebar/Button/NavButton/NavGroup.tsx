import { Box, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavGroupProps {
  label?: string | null;
  children: ReactNode;
}

export const NavGroup = (props: NavGroupProps) => {
  const { label, children } = props;
  return (
    <Box>
      {label && (
        <Text
          fontSize="xs"
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="widest"
          color={"proxima.canvas"}
          mb={2}
        >
          {label}
        </Text>
      )}
      <Stack spacing="1">{children}</Stack>
    </Box>
  );
};
