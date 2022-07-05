// components
import Header from './Header';
import TodoItem from './TodoItem';
import FormModalTodo from './FormModalTodo';
import { Accordion, Container, Link, Modal, ModalOverlay, Box, Spinner } from '@chakra-ui/react'; 

// hooks
import { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTodos, fetchTodos } from '../redux/todos';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~App~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure() 
  const dispatch = useDispatch()
  localStorage.removeItem('chakra-ui-color-mode');
  localStorage.setItem('chakra-ui-color-mode', 'light')

  const todos = useSelector(selectAllTodos);

  const todoStatus = useSelector(state => state.todos.status);

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodos())
    }
  }, [todoStatus, dispatch])

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ list content changes according to state ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
  let content;
  if (todoStatus === 'loading') {
    content = <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
      size='xl'
     />
  } else if (todoStatus === 'succeeded') {
    if (!todos.length) {
      content = <Box>No todos yet. <br/><Link onClick={onOpen}> Create first Todo 🚀 </Link></Box>
    } else {    
      content = todos.map(ex => <TodoItem todo={ex} key={`${ex.title}_${ex.id}`} />)
    }
  } else if (todoStatus === 'failed') {
    content = <Box>Oops, something went very wrong. Send me a dm on github and I'll try to fix it</Box>
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ return ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
  return (
    <Container className="App" maxWidth='container.md' >
      <Header onOpen={onOpen}  />
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={true}>
      <ModalOverlay />
        <FormModalTodo onClose={ onClose } />
      </Modal>
      <Accordion allowToggle >
        {
          content
        }
      </Accordion>
    </Container>
  );
}


export default App;
