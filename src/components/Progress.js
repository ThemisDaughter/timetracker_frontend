import { Progress, Icon, IconButton, Box, Grid, GridItem } from '@chakra-ui/react';

function TotalProgress({ completed, total }) {
  return (
    // maybe with a grid?
    // if the TotalProgress belongs to the active session, the completed should increase every minute
    <Box>
      <Progress value={completed / total} />
    </Box>
  )
}
export default TotalProgress;