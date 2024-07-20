import {
  Box,
  BoxProps,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";

interface Props extends BoxProps {
  label: string;
  value: string;
  delta: {
    value: string;
    isUpwardsTrend: boolean;
  };
}

const StatWithDivider = (props: Props) => {
  const { label, value, delta, ...boxProps } = props;
  return (
    <Box px={{ base: "4", md: "6" }} py={{ base: "2", md: "4" }} {...boxProps}>
      <Stack>
        <HStack justify="space-between">
          <Text fontSize="sm" color="muted">
            {label}
          </Text>
        </HStack>
        <Stack spacing="2">
          <Heading size={{ base: "xs", md: "sm" }}>{value}</Heading>
          {delta.value.length > 0 && (
            <HStack fontWeight="medium">
              <Icon
                color={delta.isUpwardsTrend ? "success" : "error"}
                as={delta.isUpwardsTrend ? FiArrowUpRight : FiArrowDownRight}
                boxSize="6"
              />
              <Text
                color={delta.isUpwardsTrend ? "success" : "error"}
                fontSize={{ base: "xs", md: "sm" }}
              >
                {delta.value}
              </Text>
              <Text fontSize={{ base: "xs", md: "sm" }} color="muted">
                vs last week
              </Text>
            </HStack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default StatWithDivider;
