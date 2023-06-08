import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import Navbar from '../navbar'
const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Jorge M.R. Farias - Chat App</title>
      </Head>
      <Navbar></Navbar>

      <Container maxW="container.md" pt={14}>

        {children}
      <Footer></Footer>
      </Container>
    </Box>
  )
}

export default Main