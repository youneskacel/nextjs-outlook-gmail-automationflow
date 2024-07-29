import { Badge, Box, Button, Divider, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiArrowDownRight, FiArrowUpRight, FiMoreVertical } from 'react-icons/fi'

interface Props {
  label: string
  value: string
  delta?: {
    value: string
    isUpwardsTrend: boolean
  }
}
export const Statistic = (props: Props) => {
  const { ...boxProps } = props
  // Statistics box
  return (
    <Box 
      bg="bg-surface" 
      borderRadius="lg" 
      boxShadow="md" 
      _hover={{ bg: "orange.100" }}
      {...boxProps}
    >
      <Box px="4" py="4">
        <Stack>
          <HStack justify="space-between">
            <Text fontSize="sm" color="muted">
              {props.label && props.label}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Heading size={{ base: 'sm', md: 'md' }}>{props.value}</Heading>
            {props.delta &&
              <Badge variant="subtle" colorScheme={props.delta.isUpwardsTrend ? 'green' : 'red'}>
                <HStack spacing="1">
                  <Icon as={props.delta.isUpwardsTrend ? FiArrowUpRight : FiArrowDownRight} />
                  <Text>{props.delta.value}</Text>
                </HStack>
              </Badge>
            }
          </HStack>
        </Stack>
      </Box>
    </Box>
  )
}