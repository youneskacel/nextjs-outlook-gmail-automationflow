import { FC } from "react";

import { Circle, Icon } from "@chakra-ui/react";

import { FaBuilding } from "react-icons/fa";

interface Props {
  color: string;
  onClick?: () => void;
}

const MapPin: FC<Props> = (props) => {
  return (
    <Circle
      bg={props.color}
      minHeight={8}
      minWidth={8}
      shadow="sm"
      {...props}
      transitionDuration=".2s"
      _hover={{ transform: "scale(1.2)", bg: props.color }}
      transition="ease-in"
      cursor="pointer"
      onClick={props.onClick}
    >
      <Icon as={FaBuilding} boxSize={4} color="white" />
    </Circle>
  );
};

export default MapPin;
