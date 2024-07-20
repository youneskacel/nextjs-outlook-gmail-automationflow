import React ,{useEffect,FC} from 'react'
import {Stack,Flex,Text,Center,Box,Avatar} from '@chakra-ui/react'
import { Handle, Position,useNodes,Node, NodeProps } from 'reactflow';
import { useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities'
import {FaGripVertical,FaTrash,FaGear,FaXmark} from 'react-icons/fa6'
import Image from 'next/image'

import outlookLogo from './outlookLogo.svg'
import gmailLogo from './gmailLogo.svg'

interface TaskCardProps {
  handles : boolean , id:string,title:string,description:string,to : string,data?:any,deleteTask : (id:string) => void,
  deleteFromFlow : (id:string,nodes:Node[]) => void
}

const TaskCard : FC<TaskCardProps> = ({handles=true , id , title , description,to, data, deleteTask,deleteFromFlow} ) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
    data : {
      title , 
      description,
      to
    },
    disabled : data ? true:false,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  
  // eslint-disable-next-line
  const nodes : Node[] | null = data? useNodes() : null
  const onDeleteClick = () =>{
    data.deleteFromFlow(data.id,nodes)
  }
  if(data){
    return (

      <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'} p={'4'} minH={'60px'} maxH={'105px'} minW='400px' maxW={'400px'}
        cursor={'pointer'}
        bg="canvas" 
        borderRadius="30px"
        boxShadow="sm" 
        _hover={{ bg: "gray.100" }}
        transform = {style.transform}
        ref={setNodeRef} {...listeners} {...attributes}
        position={'relative'}
        border={data.id === 'example' ? 'solid': data.selected ? 'solid' : 'none'} borderWidth={1} borderColor={data.selected ? 'green.400' : 'orange.500'}
        >

        {handles && data.id!=='example' && <Handle type='target' position={Position.Top} />}
       
       
          <Flex align={'center'}  columnGap={8} px={2} w={'100%'}>
            <Flex bg={'gray.200'} justify={'center'} align={'center'} rounded={'md'} h={'60px'} p={4}>
            {data.id ==='example' ? (
                <Avatar name='Task' width={30} bg={'gray.200'} />
            ) : (
              <Image src={data.title === 'gmail' ? gmailLogo : outlookLogo} alt='taskLogo' width={30}/>
              )}
            </Flex>

        
        <Flex direction={'column'} rowGap={1} align={'start'}>
          {data.id === 'example' ? (
            <Text fontSize={'lg'} fontWeight={'bold'} color={'orange.300'}>Title of the Task</Text>
          ): (
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {data.action === 'emails' && 'Extract Emails'}
            {data.action === 'addresses' && 'Extract Email Addresses'}
          
          </Text>
          )}
          <Flex direction={'column'} align={'start'}>
          <Text fontSize={'xs'} color={'gray.500'}> From Email : <span style={{color:'black'}}>{data.to}</span> </Text>
          </Flex>
        </Flex>
          </Flex>

      {handles && data.id!=='example' && <Handle type='source' position={Position.Bottom} /> }
          {data.id !== 'example' && (

            <Box p={1} _hover={{ bg: "orange.200",  boxShadow:"md",color:'gray.600' }} rounded={'md'} position={'absolute'} top={3} right={3}
            onClick={onDeleteClick}
            >
            <FaXmark  />
          </Box>
            )}
      
      </Flex>
    
  )
  }else
  return (

      <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'} p={'4'} h={'100px'} minW='280px'
      cursor={'pointer'}
      bg="canvas" 
      borderRadius="lg"
      boxShadow="sm" 
      _hover={{ bg: "gray.100",shadow:'lg' }}
      transform = {style.transform}
      ref={setNodeRef} 
      >
        {handles && <Handle type='target' position={Position.Top} />}
        <Flex justify={'space-between'} w='100%' align={'center'}>
    
          <Box p={2} _hover={{ bg: "orange.200",  boxShadow:"md" , color:'blue.200' }} rounded={'md'} {...listeners} {...attributes}>
            <FaGripVertical  />
          </Box>
          
          <Flex align={'center'} columnGap={2}>
          <Image src={title === 'GMAIL' ? gmailLogo : outlookLogo} alt='taskLogo' width={40}/>

        <Flex direction={'column'} align={'start'}>
          <Text fontSize={'lg'} fontWeight={'bold'}>Send Email</Text>
          <Text fontSize={'xs'} color={'gray.500'}> To : <span style={{color:'black'}}>{to}</span> </Text>
          <Text fontSize={'xs'} color={'gray.500'}>Subject : {description} </Text>
        </Flex>
          </Flex>

        <Flex>

          <Box p={1} _hover={{bg: "orange.200",  boxShadow:"md",color:'gray.600' }} rounded={'md'}>
            <FaGear  />
          </Box>
          <Box p={1} _hover={{bg: "orange.200",  boxShadow:"md",color:'gray.600' }} rounded={'md'} onClick={()=>{deleteTask(id)}}>
            <FaTrash  />
          </Box>
        </Flex>

      </Flex>


      {handles && <Handle type='source' position={Position.Bottom} /> }
      
      </Flex>
    
  )
}

export default TaskCard