
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo } from '../redux/todos';

import {
  Button, ModalContent, ModalCloseButton, ModalBody, ModalHeader, FormControl, FormLabel, Input, NumberInput, ModalFooter, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
} from '@chakra-ui/react';

const baseUrl = process.env.REACT_APP_BASE_URL
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Create todo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function FormModalTodo({ onClose }) {

// justFor testing
  const isLoading = {isLoading: false}

  const dispatch = useDispatch();
  const [hours, setHours] = useState(0);
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {

    setTitle(e.target.value);
  }
  const handleHourChange = (val) => {
    setHours(val);
  }
  const handleSubmit = async () => {
    // send to db
    try {
      // get element back?
      // or hope that redux updates the state 
      await dispatch(addNewTodo({ title, hours }))
      setTitle('');
      setHours('');

    } catch (err) {
      console.error(err.message)
    }
  
   
        // dispatch(addTodo(newTodo))

      // send dispatch action to set in the state
        // dispatch(addTodo(newTodo))
      
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
        <Button colorScheme='blue' mr={3} onClick={handleSubmit} {...isLoading}
    loadingText='Submitting' >
              Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
   </ModalContent>
)

}


export default FormModalTodo;