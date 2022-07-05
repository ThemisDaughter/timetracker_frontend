import { Flex, Box, Button } from '@chakra-ui/react';


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

export default Header;