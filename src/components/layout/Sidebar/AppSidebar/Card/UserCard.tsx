import { Avatar, Box, HStack, Text } from "@chakra-ui/react";

interface UserCardProps {
  name: string;
  image: string;
  email: string;
}

export const UserCard = (props: UserCardProps) => {
  const { name, image, email } = props;
  return (
    <HStack spacing={"4"}>
      <Avatar name={name} src={image} size={"md"} />
      <Box>
        <Text fontWeight={"bold"} fontSize="xs">
          {name}
        </Text>
        <Text fontWeight={"regular"} fontSize="xs">
          {email}
        </Text>
      </Box>
    </HStack>
  );
};
