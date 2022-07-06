
import { Progress } from '@chakra-ui/react';
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Flex, DarkMode, Stack } from '@chakra-ui/react?;'
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { createNewSession } from '../redux/worksession';

// const ChakraCalendar = chakra(Calendar,   {baseStyle: {
//   bg: 'papayawhip',
//   color: 'red.500',
// }});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Todo~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function TodoItem({ todo }) {

  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const date = new Date().toString();
      console.log(date);
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
            <Button onClick={ handleClick }>start</Button>
          </Flex>
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
    <Box>

      <Progress value={completed / total} />
    </Box>
  )
}

export default TodoItem;