import React, { FC } from "react";

import { Flex, Box, Stack, Heading } from "@chakra-ui/react";
import Automation from "@/components/module/Automation/Automation";
// Supabase
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/database.types";
interface Props {}

const Index: FC<Props> = (props) => {
  return (

    <Box w="100%" h="100vh" overflowY="auto" overflowX={"clip"} bg={"FBFBFB"}>
      <Stack>
        <Stack bg={"white"} p={"4"} borderRadius="lg">
          <Flex justifyContent="center" py={"4"}>
            <Heading size={"sm"}>Automation</Heading>
          </Flex>
          <Flex direction={'column'}>
            <Automation />

          </Flex>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Index;
