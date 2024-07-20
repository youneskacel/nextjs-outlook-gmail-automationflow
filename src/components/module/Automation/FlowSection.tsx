import React, { useState, useRef, useCallback, useEffect } from 'react';
import useResizeObserver,{UseResizeObserverCallback} from '@react-hook/resize-observer';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  Connection,
  Node,
  Background,
  PanOnScrollMode,
  NodeTypes,
  MarkerType,
  applyNodeChanges,
  NodeChange,
  EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import { Flex , Divider,Text,Box} from '@chakra-ui/react';
import TaskCard from './TaskCard';
import { DndContext , pointerWithin ,DragEndEvent } from '@dnd-kit/core';
import { Droppable , Task } from './Sidebar';
import {FaCirclePlus} from 'react-icons/fa6'



const StartNode = () => {
  return (
    <Text fontSize={'xl'} fontWeight={'bold'} color={'gray.500'}>Start from here</Text>
  )
}

const nodeTypes : NodeTypes = {
  // @ts-ignore
  taskNode : TaskCard ,
  startNode : StartNode,
}

const initialNodes :Node[]= [
  {
    id: `starter`,
    type : 'startNode',
    position : {x:350,y:40},
    data : {},
    draggable:false,
  },
  {
    id: `example`,
    type:'taskNode',
    position : {x:250,y:90},
    data: { 
            title : 'Title of the task' ,
            description : 'example ',
            to : 'example@email.com',
            id : 'example',
            
      },
    height:30,
    width : 160,
    draggable:false,
  }
]

const FlowSection = () => {
    const reactFlowWrapper = useRef<any>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [tasks,setTasks] = useState<Task[]>([])
    const [selectedTask,setSelectedTask] = useState<any>(null)

    const size = useSize(reactFlowWrapper)

    const checkEdges = (nodes : Node[]) =>{
        const sortedNodes = nodes.sort((a,b)=> b.position.y - a.position.y)
        let newEdges : Edge[] = []
        for (let i = 0; i < sortedNodes.length; i++) {
          const element = sortedNodes[i];
          if(element.id === 'starter'|| element.id === 'example') continue;
          const upperElement = sortedNodes.filter(e=>e.position.y < element.position.y)[0];
          if(upperElement){
            if(upperElement.id === 'example') continue;
            const newEdge = {
              id: `e${upperElement.id}-${element.id}`,
              type: 'step',
              source: upperElement.id,
              target: element.id,
              animated: false,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: 'gray.300',
              },
              style: {
                strokeWidth: 3,
                stroke: 'gray.500',
              },
            }
            newEdges = [...newEdges,newEdge]
          }
        }
        setEdges(newEdges)
      }

      const alignNodes  = (nodes : Node[]) => {
        const sortedNodes = nodes.sort((a,b)=> a.position.y - b.position.y).filter(el => el.id !=='starter' && el.id !== 'example')
        const xPos = size ? Math.floor((size.width - 400)/2) :250
        let newNodes : Node[] = initialNodes.map(e => ({
          ...e,
          position : {
              ...e.position,
              x: e.id === 'example' ? xPos : size ? Math.floor(size.width * 0.41 ) :350
          }
        }))
        for (let i = 0; i < sortedNodes.length; i++) {
          let element = sortedNodes[i];
          if(i ===0){
            element.position.y = 270
            element.position.x = xPos
          }else{
            const lastElement = sortedNodes[i-1]
            if(lastElement.id === 'example'){
              element.position.y = lastElement.position.y + 180
              element.position.x = xPos
            }
            element.position.y = lastElement.position.y + 180
            element.position.x = xPos
          }
            
          
          newNodes = [...newNodes,element]
        }
        return newNodes
      }

      const onNodesDragStop = (event: React.MouseEvent, node: Node, nodesDragging: Node[]) => {
       const newN = alignNodes(nodes)
       setNodes(newN)
      }

      const updateNodes = (tasks : Task[]) => {
        const nodesTask = tasks.map((e,i) => {
          return {
            id : e.id,
            type : 'taskNode',
            position : {x : 300, y: (i+1)*20},
            data : {
              title:e.title,
              action:e.action,
              description : '',
              to : e.to,
              deleteFromFlow : deleteFromFlow,
              id:e.id,
            }
          }
        })
        
        setNodes(alignNodes([...initialNodes,...nodesTask]))
        setSelectedTask(null)
      }

    const onDragEnd = useCallback( (event : DragEndEvent) =>{
      if(event.over){
        if(event.over.id === 'droppable'){
          const type = 'taskNode'
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const nEvent : any = event.activatorEvent
          const vp = reactFlowInstance.getViewport()
          const position = {
            x:300,
            y: (nEvent.clientY + event.delta.y) - reactFlowBounds.top,
          };
          const pos2 = reactFlowInstance.project(position);
          const props = event.active.data.current 
          const newNode : Node = {
            id: `${new Date().getTime()}`,
            type,
            position : pos2,
            data: { 
                    title : event.active.id,
                    selected : true,
                    deleteFromFlow : deleteFromFlow
              },
            height:40,
            width : 160
          };
          const nodes2 : Node[] = alignNodes([...nodes,newNode])
          setNodes(nodes2);
          setSelectedTask({...newNode.data,id:newNode.id})
        }
      }
      // eslint-disable-next-line
    },[reactFlowInstance,nodes,edges,tasks])

    const deleteFromFlow = useCallback( (id:string,nodes : Node[]) => {
      const newNodes = nodes.filter(e =>e.id !== id)
      setNodes(newNodes)
      setTasks(prev => prev.filter(e => e.id !== id))
      // eslint-disable-next-line
    },[nodes,tasks,setTasks,setNodes])

    useEffect(()=>{
        const newN = alignNodes(nodes)
        checkEdges(newN)
        // eslint-disable-next-line
    },[nodes])
    useEffect(()=> {
      const newN = alignNodes(nodes)
      setNodes(newN)
      //eslint-disable-next-line
    },[size])
    useEffect(()=> {
      if(tasks.length >0)
      updateNodes(tasks)
      //eslint-disable-next-line
    },[tasks])

 
    return (
      <div className="dndflow" style={{width : '100%',height : '100%'}} >
        <DndContext  onDragEnd={onDragEnd}
        collisionDetection={pointerWithin}
        >
            <Flex justifyContent={'space-between'} maxH={'85vh'} >
        <Droppable>
          <Text fontSize={'2xl'} color={'gray.500'} fontWeight={'medium'} mx={4} my={1}>Flow </Text>
          <Box m={4} bg={'gray.50'} rounded={'xl'}>
             
         <ReactFlowProvider>

          <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{width : '100%',height : '76vh'}}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
             // onConnect={onConnect}
              onNodeDragStop={onNodesDragStop}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              panOnScroll
              panOnScrollMode={PanOnScrollMode.Vertical}
              panOnDrag = {false}
              minZoom={1}
              maxZoom={1}
              
              >
                <Background /> 
            </ReactFlow>
          </div>
        </ReactFlowProvider> 
        </Box>

        </Droppable>
          <Divider orientation='vertical' w='1px' h='80vh' />
          <Sidebar tasks={tasks} setTasks={setTasks} deleteFromFlow={deleteFromFlow} selectedTask={selectedTask}/>
            </Flex>

        </DndContext>
      </div>
    );
  };




export default FlowSection


const useSize = (target : React.RefObject<HTMLElement> ) => {
  const [size, setSize] = React.useState<any>()

  React.useEffect(() => {
    
    setSize(target?.current?.getBoundingClientRect())
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size
}
