import React, { FC } from "react";

import { Flex, SimpleGrid, Box, Stack, Heading } from "@chakra-ui/react";

// Supabase
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/database.types";

import { Statistic } from "@/components/common/Form/statistic/statistic";

interface Props {}

const Index: FC<Props> = (props) => {
  return (
    <Box w="100%" h="100vh" overflowY="auto" overflowX={"clip"} bg={"FBFBFB"}>
      <Stack padding={6}>
        <Stack bg={"white"} p={"4"} borderRadius="lg">
          <Flex justifyContent="center" py={"4"}>
            <Heading size={"sm"}>Devvelopment Dashboard</Heading>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={"2"}>
            <Stack cursor={"pointer"}>
              <Statistic
                key={"Active Campaigns"}
                label={"Active Campaigns"}
                value={"2"}
              />
            </Stack>
            <Stack cursor={"pointer"}>
              <Statistic
                key={"Qualified Leads"}
                label={"Qualified Leads"}
                value={"4"}
              />
            </Stack>
            <Stack cursor={"pointer"}>
              <Statistic
                key={"Active Enquiries"}
                label={"Active Enquiries"}
                value={"4"}
              />
            </Stack>
            <Stack cursor={"pointer"}>
              <Statistic
                key={"New listings"}
                label={"New listings"}
                value={"1"}
              />
            </Stack>
          </SimpleGrid>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Index;
