import { useEffect, useState } from "react";
import { Box, Flex } from '@chakra-ui/react'


const Timer = ({ initialSeconds }) => {

  const [seconds, setSeconds] = useState(initialSeconds);

  const setTime = () => {
    setSeconds(prev => prev+=1)
  }

  useEffect(() => {
    const counter = setInterval(setTime, 1000);
    return () => clearInterval(counter)
  }, []);

  return (
    <Flex>
      {
        seconds > 3600
          ? <Box m='2px' p='2px 4px' borderRadius='3px' bg='rgba(0,0,0,0.2)'>{`${Math.floor(seconds / 3600)}h `}</Box>
          : null
      }
      {
        seconds > 60
          ? <Box m='2px' p='2px 4px' borderRadius='3px' bg='rgba(0,0,0,0.2)'>{`${Math.floor(seconds / 60)}m `}</Box>
          : null
      }
      <Box m='2px' p='2px 4px' borderRadius='3px' bg='rgba(0,0,0,0.2)'>{ `${seconds%60}s ` }</Box>
    </Flex>
  )
}

export default Timer