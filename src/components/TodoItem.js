
import { useEffect, useState } from 'react';
import { Progress } from '@chakra-ui/react';
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

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const dispatch = useDispatch();

  const activeSession = useSelector(state => state.worksession.activeSession);
  const sessionStatus = useSelector(state => state.worksession.status);

  // if a session is not finished, the first thing to do is to fetch the session from the db
  useEffect(() => {
    if (sessionStatus === 'idle') dispatch(fetchActiveSession())
  }, [sessionStatus, dispatch])
  
  // as soon as there is a session, the start date can be taken from it and the timer is started 
  useEffect(() => {
    if (activeSession) {
   console.log('there is an active session with the start time of ', activeSession.start_time)
  }
}, [activeSession])

  const handleClick = async () => {
    try {
      const date = new Date();
      await dispatch(createNewSession({start_time: date, todoID: todo.id}))
    } catch (err) {
      console.error(err.message)
    }
  }
  function timer() {
    if (seconds > 60) {
      setMinutes(Math.floor(seconds / 60));
      setSeconds(seconds % 60);
    }
    setTimeout(() => {
      setInterval(() => {
        if (seconds === 59) {
          setMinutes(prev => prev+=1);
          setSeconds(0);
        }
      }, 1000)
     }, 1000)
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
            testclock:
            {activeSession ? <p>session is active since: { activeSession.start_time }</p> : null}
            {
              Math.floor(seconds / 3600) ? <span>{Math.floor()}h</span> : null     
            }
            {
              minutes ? <span>{minutes}m</span> : null
            }
            {
              seconds ? <span>{seconds}m</span> : null
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