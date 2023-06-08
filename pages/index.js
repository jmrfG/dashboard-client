import {
  Container,
  Heading,
  Box,
  //useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import ExpenseForm from "../components/expensesForm";
import Layout from "../components/layouts/article";

const Home = () => {

  return (
    <Layout>
      <Container>
        <Box display={{ md: "flex" }} my={6} p={3}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Jorge M.R. de Farias - Registro de Despesas e Créditos
            </Heading>
            <ExpenseForm></ExpenseForm>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
