// components
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Accordion, Container, Modal, ModalOverlay,
  ModalContent, ModalCloseButton, ModalBody, ModalHeader, FormControl, FormLabel, Input, NumberInput, ModalFooter, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Box, Button, Flex, useColorMode,
} from '@chakra-ui/react'; 

// hooks
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo } from './redux/features/todos';

// envs
const baseUrl = process.env.REACT_APP_BASE_URL ;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure() 
  localStorage.removeItem('chakra-ui-color-mode');
  localStorage.setItem('chakra-ui-color-mode', 'light')

  const exampleData = useSelector(state => state.todos.todos)

  return (
    <Container className="App" maxWidth='container.md' >
      <Header onOpen={onOpen}  />
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <TodoForm onClose={ onClose } />
      </Modal>
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


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Header~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function Header({ onOpen }) {


  return (
    <Flex justify='space-between' align='baseline' mt='1rem' >
    <Box >

    <h1>My Learning Tracker</h1>
    </Box>
    <Button variant='outline' onClick={onOpen}>add task</Button>
  </Flex>)
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Todo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

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
            {/* <CalendarStyles> */}
            {/* <DarkMode> */}
            <Calendar />
            {/* </DarkMode> */}
            {/* </CalendarStyles> */}
        <Box >
          <Button variant='outline'>delete</Button>
        </Box>
      </Flex>
    </AccordionPanel>
    </AccordionItem>
    </Box>
  )
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Crate todo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function TodoForm({ onClose }) {
  const dispatch = useDispatch();
  const [hours, setHours] = useState(0);
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {

    setTitle(e.target.value);
  }
  const handleHourChange = (val) => {
    setHours(val);
  }
  const handleSubmit = () => {
    // send to db
    fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, hours })
    })
    // get element back
      .then(res => JSON.stringify(res))
      .then(newTodo =>console.log(newTodo)
        // dispatch(addTodo(newTodo))
      )
    // send dispatch action to set in the state
    // hope that redux updates the state 
  }


  return (
    <ModalContent>
      <ModalHeader>new item</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired >
          <FormLabel>Skill to learn</FormLabel>
          <Input placeholder='Todo'value={title} onChange={handleTitleChange} />
        </FormControl>

        <FormControl mt={4} isRequired >
          <FormLabel>How many hours to spend training</FormLabel>
          <NumberInput min={1} max={300} value={hours} onChange={(val)=>handleHourChange(val)} >
          <NumberInputField id='amount' />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={handleSubmit} >
              Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
   </ModalContent>
)

}



export default App;
