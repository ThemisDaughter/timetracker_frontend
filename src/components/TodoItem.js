
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Flex } from '@chakra-ui/react?;'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
            {/* <LightMode> */}
            <Calendar />
            {/* </LightMode> */}
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

export default TodoItem;