import React, { FC, ReactNode } from "react";

import { Stack, HStack, Text } from "@chakra-ui/react";

interface Props {
  chart: ReactNode;
  title: string;
}

const ChartWithTitleContainer: FC<Props> = ({ chart, title }) => {
  return (
    <Stack width="100%" height="100%" p={4}>
      <HStack justify={"space-between"}>
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight={"medium"}>
          {title}
        </Text>
      </HStack>
      {chart}
    </Stack>
  );
};

export default ChartWithTitleContainer;
