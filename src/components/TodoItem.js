
import { useEffect, useState } from 'react';
import Timer from './Timer';
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Flex, DarkMode, Stack } from '@chakra-ui/react?;'
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { createNewSession, fetchActiveSession, endWorkSession } from '../redux/worksession';
import { updateCompletedTime } from '../redux/todos';
import Progress from './Progress';

// const ChakraCalendar = chakra(Calendar,   {baseStyle: {
//   bg: 'papayawhip',
//   color: 'red.500',
// }});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Todo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function TodoItem({ todo }) {

  const [hasActiveSession, setHasActiveSession] = useState(false);

  const dispatch = useDispatch();

  const activeSession = useSelector(state => state.worksession.activeSession);
  const completedSession = useSelector(state => state.worksession.completedSession);
  const sessionStatus = useSelector(state => state.worksession.status);


  useEffect(() => {
    if (sessionStatus === 'idle') dispatch(fetchActiveSession());
    // sets hasActiveSession to true if the components todoid matches the active session todo id
    if (activeSession) setHasActiveSession(activeSession.todoID === todo.id);
  }, [sessionStatus, activeSession, dispatch, todo.id]);

   

  const onSessionStart = async () => {
    try {
      const date = new Date();
      await dispatch(createNewSession({start_time: date, todoID: todo.id}))
    } catch (err) {
      console.error(err.message)
    }
  }
  const onSessionEnd = async () => {
    try {
      const date = new Date();
      // setting worksession end_time
      setHasActiveSession(false);
      const { payload } = await dispatch(endWorkSession({ sessionID: activeSession.id, end_time: date }));
      console.log('in the very unlikely case that dispatch action actually does return the value, this is it: ', payload)
      await dispatch(updateCompletedTime({...payload, upTillNow: todo.total_minutes_studied}))
    } catch (err) {
      console.error(err.message)
    }
  }



  return (
    <Box borderRadius='lg' overflow='hidden' bg={hasActiveSession ? 'rgba(77, 37, 94, 0.6)' : 'rgba(77, 37, 94, 0.3)'} mt='2'>
    <AccordionItem key={todo.title} border='none' >
          <Stack  p='16px'>

    <Flex w='100%' justify='space-between'>
        <h2>
          {todo.title}
            </h2>
            {hasActiveSession
              ? <Button onClick={ onSessionEnd }>stop session</Button>
              : <Button onClick={onSessionStart}>start working</Button>
            }
          </Flex>
            <Box w='100%'>
            {
              hasActiveSession && <Timer startTime={activeSession.start_time} />
            }
          </Box>
          {
            !hasActiveSession && <Progress completed={todo.total_minutes_studied} total={ todo.total_minutes_planned } />
          }
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




export default TodoItem;