import React, { FC, useEffect } from "react";
import { NextPage } from "next";

import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props {}

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/apps/home");
  }, [router]);

  return <Text></Text>;
};

export default Index;
