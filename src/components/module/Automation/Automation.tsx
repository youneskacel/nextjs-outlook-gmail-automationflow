import React, { FC ,useEffect,useState} from "react";
import { Text,Flex } from "@chakra-ui/react";
import FlowSection from "./FlowSection";
interface Props {}

const Automation: FC<Props> = (props) => {

  return (
  <div>

    <Flex justifyContent={'space-between'} h={'100%'}>
    <FlowSection />
    </Flex>
  </div>
    );
};

export default Automation;
