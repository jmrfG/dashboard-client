import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup
} from '@chakra-ui/react';
import axios from 'axios';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/operations/get_All');
        setData(response.data);
        setIsLoading(false);
        
        const totalDebt = response.data
          .filter(product => product.paymentType === 'a_pagar')
          .reduce((acc, product) => acc + product.totalValue, 0);
        setTotalDebt(totalDebt);
        
        const totalCredit = response.data
          .filter(product => product.paymentType === 'a_receber')
          .reduce((acc, product) => acc + product.totalValue, 0);
        setTotalCredit(totalCredit);

      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>Error: {error}</Text>
      </Flex>
    );
  }

  return (
    <Box p="4">
      <Heading as="h1" mb="8">
        Dashboard
      </Heading>

      <StatGroup>
        <Stat>
          <StatLabel>Total Debt</StatLabel>
          <StatNumber>${totalDebt}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Total Credit</StatLabel>
          <StatNumber>${totalCredit}</StatNumber>
        </Stat>
      </StatGroup>

      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>Payment Type</Th>
            <Th>Description</Th>
            <Th>Total Value</Th>
            <Th>Paid Value</Th>
            <Th>Remaining Value</Th>
            <Th>Reference Date</Th>
            <Th>Payment Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((product) => (
            <Tr key={product.id}>
              <Td>{product.paymentType}</Td>
              <Td>{product.description}</Td>
              <Td>${product.totalValue}</Td>
              <Td>${product.paidValue}</Td>
              <Td>${product.remainingValue}</Td>
              <Td>{product.referenceDate}</Td>
              <Td>{product.paymentDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Dashboard;