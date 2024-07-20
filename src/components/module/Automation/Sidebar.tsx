import React ,{FC,useRef,useState,useEffect, ReactNode} from 'react';
import Image from 'next/image'
import { Text,Flex,Divider,Select, Box,Button } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import { Input,InputGroup,InputLeftElement } from '@chakra-ui/react';
import {FaMagnifyingGlass} from 'react-icons/fa6'
import TaskCard from './TaskCard';
import {useDroppable,useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import GoogleLoginButton from './GoogleLoginButton';
import { Node } from 'reactflow';
import outlookLogo from './outlookLogo.svg'
import gmailLogo from './gmailLogo.svg'
import dynamic from 'next/dynamic';
const OutlookLoginButton = dynamic(()=> import('./OutlookLoginButton'))
interface Props {}

 export interface Task {
  id : string ,
  title : string,
  description : string,
  to : string,
  action : string
}
interface Contact {
  name : string ,
  address : string | undefined
}
const selectedStyle = {color : 'gray.800',fontWeight:'medium',
borderBottom:'solid',borderBottomWidth:'2px',borderBottomColor : 'gray.800' , borderBottomRadius:'1px'}


const Sidebar = ({tasks ,setTasks , deleteFromFlow,selectedTask} : {tasks : Task[],setTasks : React.Dispatch<React.SetStateAction<any>>,deleteFromFlow : (id:string,nodes:Node[]) => void,selectedTask : any}) => {
  
  const [target,setTarget] = useState('outlook')
  const [action,setAction] = useState('')
  const [targetMail,setTargetMail] = useState<string|null>(null)
  const [createError,setCreateError] = useState(false)
  const [contacts,setContacts] = useState<Contact[]>([])
 

  const createTask = () =>{
    setCreateError(false)
    if(action === '' || target === ''|| !targetMail){
      return setCreateError(true)
    }
    let title = target.toUpperCase();
    
    const to = targetMail
    const description = `Lorem ipsum dolor sit amet`
    const id = `${new Date().getTime()}`;

    setTasks((prev :any )=> [...prev,{...selectedTask,to,action}])
    setTargetMail(null)
    setAction('')
  }

  useEffect(()=>{
    if(targetMail!==''&&action!=='')
    setCreateError(false)
  //eslint-disable-next-line
  },[action,target])
  
  useEffect(()=>{
    setContacts([])
  },[target])
  

  return (
    <Flex direction={'column'} p={2} w={350} minW={350} maxH={'100%'} >
      {!selectedTask ? (

      <Flex direction={'column'} >
      <Text fontSize={'lg'} fontWeight={'medium'} color={'gray.400'} mt={1} mb={2} >Select Step </Text>

      <InputGroup my={3}>
        <InputLeftElement pointerEvents='none' color={'gray.500'}>
          <FaMagnifyingGlass  />
        </InputLeftElement>
      <Input type='tel' placeholder='Search contact...' py={2}
      _placeholder={{fontSize:'sm',color:'gray.500'}}
      />
    </InputGroup>

    <Tabs isFitted variant='unstyled' my={2} h={'200px'}>
      <TabList >
        <Tab fontSize={'sm'} color={'gray.500'} _selected={selectedStyle}>
          All</Tab>
        <Tab fontSize={'sm'} color={'gray.500'} _selected={selectedStyle}>
        Action</Tab>
        <Tab fontSize={'xs'} color={'gray.500'} _selected={selectedStyle}>
        Contact</Tab>
      </TabList>
    
      <TabPanels>
        <TabPanel>
        <Draggable id='gmail'>
          <Flex columnGap={3} align={'center'} shadow={'md'} rounded={'md'} p={3} cursor={'pointer'}
          _hover={{shadow:'lg'}} my={2} bg={'white'}
          
          >
            <Image src={gmailLogo} alt='gmailLogo' width={30} />
            <Text fontSize={'xl'} color={'gray.500'} > Gmail</Text>

          </Flex>
         
          </Draggable>
          <Draggable  id='outlook'>
          <Flex columnGap={3} align={'center'} shadow={'md'} rounded={'md'} p={3} cursor={'pointer'}
          _hover={{shadow:'lg'}} my={2}
          w={'100%'}
         
          >
            <Image src={outlookLogo} alt='outlookLogo' width={30} />
            <Text fontSize={'xl'} color={'gray.500'} > Outlook</Text>
          </Flex>
          </Draggable>
        </TabPanel>

        <TabPanel>
        <Flex columnGap={3} align={'center'} shadow={'md'} rounded={'md'} p={1} px={3} cursor={'pointer'}
          _hover={{shadow:'lg'}} my={2}
          border={action==='email' ? 'solid' : 'none'} borderWidth={'2px'} borderColor={'green.300'}
          onClick={()=> {
          }}
          >
            <Text fontSize={'lg'} color={'gray.800'} >Send Email</Text>
          </Flex>
        </TabPanel>

        <TabPanel>
          
        </TabPanel>
      </TabPanels>
    </Tabs>
  

      </Flex>
      ) : (

        
        <Flex direction={'column'}>
          <Flex align={'center'} columnGap={4} my='4' p={2} border={'solid'} borderColor={'gray.200'} bg={'gray.50'}>
            <Image src={selectedTask?.title === 'gmail' ? gmailLogo : outlookLogo} alt='targetLogo' width={50}/>
            <Text fontSize={'xl'}>
              {selectedTask?.title === 'gmail' && 'Gmail'}
              {selectedTask?.title === 'outlook' && 'Outlook'}
            </Text>
          </Flex>
        

        <Select placeholder='Action' my={3} mt={5}
        onChange={(e)=> {setAction(e.target.value)}}
        >
          <option value="addresses">Extract Email Addresses</option>
          <option value="emails">Extract Emails</option>
        </Select>

       
        {selectedTask.title === 'gmail' && <GoogleLoginButton setContacts={setContacts} setTargetMail={setTargetMail}/>}
        
      {selectedTask.title === 'outlook' && <OutlookLoginButton setContacts={setContacts} setTargetMail={setTargetMail}/>}

        <Flex justify={'end'} mt={2} mb={1}>
      <Button variant={'solid'} onClick={()=> createTask()} >
        Save
      </Button>
      </Flex>

      <Flex justify={'center'} h={6}>
        {createError && (

          <Text 
          color={'red.600'} fontSize={'xs'} borderBottom={'solid'} borderBottomColor={'red.600'}
          >*Check all the fields</Text>
          )}
      </Flex>



      </Flex>

        )}
      

     
    </Flex>
  )
}

export default Sidebar

export function Droppable(props : {children : ReactNode}) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
    width : '100%',
    height : '100%',
    
  };
  

  return (
    <div ref={setNodeRef} style={style} className='drpp'>
      {props.children}
    </div>
  );
}

const Draggable = (props : {children : ReactNode,id:any}) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div ref={setNodeRef} style={{...style,width : '100%'}} {...listeners} {...attributes}>
      {props.children}
    </div>
  )
}

