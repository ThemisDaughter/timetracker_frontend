import { useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Accordion, Container, Modal, ModalOverlay,
  ModalContent, ModalCloseButton, ModalBody, ModalHeader, FormControl, FormLabel, Input, NumberInput, ModalFooter, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Box, Button, Flex,
} from '@chakra-ui/react'; 
import { useDisclosure } from '@chakra-ui/react';

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
  const { isOpen, onOpen, onClose } = useDisclosure()


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

            <Calendar />
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
  
  const initialRef = useRef(null)

  return (
    <ModalContent>
      <ModalHeader>new item</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isRequired onChange={(e)=>{console.log(e.target.value)}}>
          <FormLabel>Skill to learn</FormLabel>
          <Input ref={initialRef} placeholder='Todo' />
        </FormControl>

        <FormControl mt={4} isRequired onChange={(e)=>{console.log(e.target.value)}}>
          <FormLabel>How many hours to spend training</FormLabel>
          <NumberInput min={1} max={300} >
          <NumberInputField id='amount' />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} >
              Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
   </ModalContent>
)

}



export default App;
