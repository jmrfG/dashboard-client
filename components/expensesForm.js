import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Flex,
  VStack,
  Box,
  Button,
  Select,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import axios from "axios";

export default function ExpenseForm() {
  const [id, setId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataReferencia, setDataReferencia] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");
  const [valorTotal, setValorTotal] = useState(0);
  const [valorPago, setValorPago] = useState(0);
  const [paymentType, setPaymentType] = useState("");

  const cleanup = () =>{
    setDescricao('')
    setDataPagamento('')
    setDataReferencia('')
    setValorTotal(0)
    setValorPago(0)
    setPaymentType('')
  }


  function handleSubmit(event) {
    event.preventDefault();
    // handle form submission here
    const payload = {
        'description': descricao,
        'referenceDate': dataReferencia,
        'paymentDate': dataPagamento,
        'totalValue': valorTotal,
        'paidValue': valorPago,
        'remainingValue': Math.abs(valorTotal - valorPago),
        'paymentType': paymentType
    }
    axios.post("http://localhost:8080/api/operations/add_product", payload)
    cleanup()
  }

  return (
    <Box p={4} my={3} shadow="md" borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="id">Tipo</FormLabel>
            <RadioGroup onChange={setPaymentType} value={paymentType} >
              <Radio mx={2} value="a_receber">A Receber</Radio>
              <Radio value="a_pagar">A Pagar</Radio>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="descricao">Descrição</FormLabel>
            <Input
              id="descricao"
              type="text"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="dataReferencia">Data de Referência</FormLabel>
            <Input
              id="dataReferencia"
              type="date"
              value={dataReferencia}
              onChange={(event) => setDataReferencia(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="dataPagamento">Data de Pagamento</FormLabel>
            <Input
              id="dataPagamento"
              type="date"
              value={dataPagamento}
              onChange={(event) => setDataPagamento(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="valorDebito">
              Valor da Pagar ou a Receber
            </FormLabel>
            <Input
              id="valorTotal"
              type="number"
              step="0.01"
              value={valorTotal}
              onChange={(event) => setValorTotal(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="valorPago">Valor Pago ou Recebido</FormLabel>
            <Input
              id="valorPago"
              type="number"
              step="0.01"
              value={valorPago}
              onChange={(event) => setValorPago(event.target.value)}
            />
          </FormControl>
        </VStack>
        <Button my={2} onClick={handleSubmit}>Submit</Button>
      </form>
    </Box>
  );
}
