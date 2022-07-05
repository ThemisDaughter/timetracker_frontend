// components
import Header from './Header';
import TodoItem from './TodoItem';
import FormModalTodo from './FormModalTodo';
import { Accordion, Container, Link, Modal, ModalOverlay, Box } from '@chakra-ui/react'; 

// hooks
import { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTodos, fetchTodos, addTodo, deleteTodo } from '../redux/todos';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~App~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function App() {

  const { isOpen, onOpen, onClose } = useDisclosure() 
  const dispatch = useDispatch()
  localStorage.removeItem('chakra-ui-color-mode');
  localStorage.setItem('chakra-ui-color-mode', 'light')

  const todos = useSelector(selectAllTodos);

  const todoStatus = useSelector(state => state.todos.status)

  useEffect(() => {
    if (todoStatus === 'idle') {
      dispatch(fetchTodos())
    }
  }, [todoStatus, dispatch])

  return (
    <Container className="App" maxWidth='container.md' >
      <Header onOpen={onOpen}  />
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={true}>
      <ModalOverlay />
        <FormModalTodo onClose={ onClose } />
      </Modal>
      <Accordion allowToggle >
        {
          todos.length ? todos.map((ex, i)=> {
            return <TodoItem todo={ex} key={`${ex.title}_${i}`} />
          }) : <Box>
              No todos yet. <br/><Link onClick={onOpen}> Create first Todo 🚀 </Link>
          </Box>
        }
      </Accordion>
    </Container>
  );
}


export default App;
