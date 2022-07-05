
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo } from '../redux/todos';

import {
  Button, ModalContent, ModalCloseButton, ModalBody, ModalHeader, FormControl, FormLabel, Input, NumberInput, ModalFooter, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
} from '@chakra-ui/react';

const baseUrl = process.env.REACT_APP_BASE_URL
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Create todo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function FormModalTodo({ onClose }) {
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
    console.log(baseUrl)
   
  
    // get element back
   
        // dispatch(addTodo(newTodo))

      // send dispatch action to set in the state
        // dispatch(addTodo(newTodo))
      
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


export default FormModalTodo;