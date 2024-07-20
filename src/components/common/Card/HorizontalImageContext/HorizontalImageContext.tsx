import React, { FC } from "react";

import {
  Card,
  CardBody,
  Stack,
  Text,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaChartArea, FaMapPin, FaMaximize } from "react-icons/fa6";

interface Props {
  image_src?: string;
  title: string;
  description: string;
  description_title: string;
  type: string;
  size: number;
  url?: string;
  source: string;
}

const HorizontalImageContext: FC<Props> = ({
  description,
  description_title,
  image_src,
  title,
  type,
  size,
  url,
  source,
}) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton w={"full"}>
          <Card direction={"row"} w={"full"} variant={"unstyled"} p={4}>
            {image_src && (
              <Image w={"25%"} objectFit="cover" src={image_src} alt={title} />
            )}
            <Stack p={4}>
              <CardBody>
                <Stack spacing={2}>
                  <Text fontWeight={"light"} fontSize={"sm"} textAlign="left">
                    {source}
                  </Text>
                  <Text fontWeight="medium" fontSize={"sm"} textAlign="left">
                    {title}
                  </Text>
                  <HStack spacing={4}>
                    <HStack spacing={2}>
                      <Icon
                        as={FaMaximize}
                        color="proxima.gray"
                        fontSize={"sm"}
                      />
                      <Text fontSize={"sm"} color={"mute"}>
                        {size + "m²"}
                      </Text>
                    </HStack>
                    <Text fontSize={"sm"} color={"mute"}>
                      {type}
                    </Text>
                  </HStack>
                </Stack>
              </CardBody>
            </Stack>
          </Card>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Stack spacing={4}>
            {url && (
              <Button size={"xs"} onClick={() => window.open(url, "_blank")}>
                See property
              </Button>
            )}
            <Text fontWeight={"semibold"}>{description_title}</Text>
            <Text>{description}</Text>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default HorizontalImageContext;
