
import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" opacity={0.6} fontSize='sm'>
      &copy; {new Date().getFullYear()} Jorge M.R. Farias. Inspired by Mr. Takura Matsuyama.
    </Box>
  )
}

export default Footer