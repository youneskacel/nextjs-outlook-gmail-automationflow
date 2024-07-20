import React, { FC, ReactNode } from "react";

import { Flex, Box } from "@chakra-ui/react";
import AppSidebar from "../../Sidebar/AppSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <Flex h="100vh" flexDir={"row"}>
      <AppSidebar />
      <Box w={"100vw"} h={"100vh"} overflowY="auto" bg={"proxima.canvas"}>
        {children}
      </Box>
    </Flex>
  );
};

export default AppLayout;
