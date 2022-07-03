import { useState } from 'react';
import Calendar from 'react-calendar';
import {
  Accordion, Container,
  AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Box, Button, Flex
} from '@chakra-ui/react'; 

const exampleData = [
  {
    title: 'learn blender',
    total_time_planned: 360000,
    total_time_studied: 14400,
    completed: false,
    abandoned: false
  }, {
    title: 'learn redux',
    total_time_planned: 36000,
    total_time_studied: 0,
    completed: false,
    abandoned: false
  }, {
    title: 'read Ray Dalio',
    total_time_planned: 72000,
    total_time_studied: 10800,
    completed: false,
    abandoned: false
  }, 
]


function App() {
  return (
    <Container className="App" maxWidth='container.md' >
      <Accordion allowToggle >
        {
          exampleData.map(ex => {
            return <TodoItem todo={ex} key={ ex.title } />
          })
        }
      </Accordion>
    </Container>
  );
}



function TodoItem({ todo }) {

  return (
    <Box borderRadius='lg' overflow='hidden' bg='rgba(77, 37, 94, 0.3)' mt='2'>
    <AccordionItem key={todo.title}>

    <AccordionButton _expanded={{ bg: 'rgb(116, 19, 158)', color: 'white' }}>
    <Box  flex='1' textAlign='left'>

        <h2>
          {todo.title}
        </h2>
    </Box>
    <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      <Flex>
        <Box bg='#D9D9D9' p='.5rem' borderRadius='md' flexGrow='0' display='flex' alignItens='flex-start'>
          <Calendar view='month' />
        </Box>
        <Box >
          <Button variant='outline'>delete</Button>
        </Box>
      </Flex>
    </AccordionPanel>
    </AccordionItem>
    </Box>
  )
}

export default App;
