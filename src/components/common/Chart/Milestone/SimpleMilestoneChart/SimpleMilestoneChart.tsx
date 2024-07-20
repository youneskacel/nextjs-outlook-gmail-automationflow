import { FC } from "react";

import {
  VStack,
  Heading,
  Box,
  Link,
  Container,
  BoxProps,
  Circle,
  Flex,
  useColorModeValue,
  Text,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { FaCalendar, FaLayerGroup, FaUser } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

interface Props {}

const SimpleMilestoneChart: FC<Props> = (props) => {
  return (
    <VStack textAlign="start" align="start">
      <Box zIndex={5}>
        <Box pt={4}>
          <MilestoneItem icon={FaUser}>
            <Text fontSize={"sm"} color={"muted"}>
              24 May
            </Text>
            <Text>Drakon Andrews</Text>
          </MilestoneItem>
          <MilestoneItem icon={FaLayerGroup}>
            <Text fontSize={"sm"} color={"muted"}>
              1 May
            </Text>
            <Text>Campaign (149 enquiries)</Text>
          </MilestoneItem>
          <MilestoneItem icon={FaCalendar}>
            <Text fontSize={"sm"} color={"muted"} fontWeight={"semibold"}>
              Year
            </Text>
            <Text color={"muted"} fontWeight={"semibold"}>
              2023
            </Text>
          </MilestoneItem>
          <MilestoneItem icon={FaUser}>
            <Text fontSize={"sm"} color={"muted"}>
              14 October
            </Text>
            <Text>Tom Nubles</Text>
          </MilestoneItem>
          <MilestoneItem icon={FaCalendar} skipTrail>
            <Text fontSize={"sm"} color={"muted"} fontWeight={"semibold"}>
              Year
            </Text>
            <Text color={"muted"} fontWeight={"semibold"}>
              2009
            </Text>
          </MilestoneItem>
        </Box>
      </Box>
    </VStack>
  );
};

interface MilestoneItemProps extends BoxProps {
  icon?: any;
  boxProps?: BoxProps;
  skipTrail?: boolean;
}

const MilestoneItem: FC<MilestoneItemProps> = ({
  icon = FiCheckCircle,
  boxProps = {},
  skipTrail = false,
  children,
  ...props
}) => {
  const color = useColorModeValue("_brand.black", "gray.500");
  const linecolor = useColorModeValue("_brand.grey", "gray.500");
  return (
    <Flex minH={20} cursor="pointer" {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle
          size={12}
          bg={useColorModeValue("gray.700", "gray.500")}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box
          as={icon}
          size="1.25rem"
          color={color}
          pos="absolute"
          left="0.875rem"
          top="0.875rem"
        />
        {!skipTrail && <Box w="1px" flex={1} bg={linecolor} my={1} />}
      </Flex>
      <Box {...boxProps}>{children}</Box>
    </Flex>
  );
};

export default SimpleMilestoneChart;
