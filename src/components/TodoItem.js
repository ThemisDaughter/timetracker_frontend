
import { useEffect, useState } from 'react';
import { Progress } from '@chakra-ui/react';
import Timer from './Timer';
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Flex, DarkMode, Stack } from '@chakra-ui/react?;'
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { createNewSession, fetchActiveSession } from '../redux/worksession';

// const ChakraCalendar = chakra(Calendar,   {baseStyle: {
//   bg: 'papayawhip',
//   color: 'red.500',
// }});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Todo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function TodoItem({ todo }) {

  const [sessionTime, setSessionTime] = useState(100);

  const dispatch = useDispatch();

  const activeSession = useSelector(state => state.worksession.activeSession);
  const sessionStatus = useSelector(state => state.worksession.status);

  // if a session is not finished, the first thing to do is to fetch the session from the db
  useEffect(() => {
    if (sessionStatus === 'idle') dispatch(fetchActiveSession())
  }, [sessionStatus, dispatch])
  

  const handleClick = async () => {
    try {
      const date = new Date();
      await dispatch(createNewSession({start_time: date, todoID: todo.id}))
    } catch (err) {
      console.error(err.message)
    }
  }



  return (
    <Box borderRadius='lg' overflow='hidden' bg='rgba(77, 37, 94, 0.3)' mt='2'>
    <AccordionItem key={todo.title} border='none' >
          <Stack  p='16px'>

    <Flex w='100%' justify='space-between'>
        <h2>
          {todo.title}
        </h2>
            <Button onClick={handleClick}>start</Button>
          </Flex>
            <Box w='100%'>
            {
              activeSession && activeSession.todoID === todo.id && <Timer initialSeconds={sessionTime} />
            }
          </Box>
            <TotalProgress completed={todo.total_time_studied} total={ todo.total_time_planned } />
          </Stack>
        <AccordionButton>
         <AccordionIcon />
        </AccordionButton>  
    <AccordionPanel>
          <Flex>
            <DarkMode>
              {/* <Box>
            <ChakraCalendar />
              </Box> */}
            </DarkMode>
        <Box >
          <Button variant='outline'>abandon</Button>
        </Box>
      </Flex>
    </AccordionPanel>
    </AccordionItem>
    </Box>
  )
}


function TotalProgress({ completed, total }) {
  return (
    // maybe with a grid?
    // if the TotalProgress belongs to the active session, the completed should increase every minute
    <Box>
      <Progress value={completed / total} />
    </Box>
  )
}

export default TodoItem;