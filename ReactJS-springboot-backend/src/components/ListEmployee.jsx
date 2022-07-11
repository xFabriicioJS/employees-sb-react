import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import EmployeeAPIService from "../services/EmployeeAPIService";

const urlAPI = "http://localhost:8080/api/v1/employees";

function ListEmployee() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [employees, setEmployees] = useState([""]);
  let navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetch(urlAPI);
      const responseJSON = await response.json();
      setEmployees(responseJSON);
      
    } catch (error) {
      console.log(error);
    }
  };

  const editEmployee = (id) => {
    navigate(`/update-employee/${id}`, { state: { id } });
  };

  const deleteEmployee = async (id) => {
    onClose();
    await EmployeeAPIService.deleteEmployee(id);
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Box marginTop="5" ml="44">
        <Link to="/add-employee">
          <Button size="lg" colorScheme="green">
            Adicionar funcionário
          </Button>
        </Link>
      </Box>
      <TableContainer
        w="80%"
        m="0 auto"
        borderWidth="1px"
        borderColor="teal"
        rounded="xl"
        my="2"
      >
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Lista de funcionários</TableCaption>
          <Thead>
            <Tr>
              <Th>Nome do funcionário</Th>
              <Th>Sobrenome do funcionário</Th>
              <Th>Email do funcionário</Th>
              <Th textAlign="center">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee) => {
              return (
                <Tr key={employee.id}>
                  <Td>{employee.firstName}</Td>
                  <Td>{employee.lastName}</Td>
                  <Td>{employee.emailId}</Td>
                  <Td>
                    <Button
                      size="sm"
                      mr="3"
                      colorScheme="green"
                      onClick={() => editEmployee(employee.id)}
                    >
                      Atualizar
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={onOpen}>
                      Deletar
                    </Button>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                      motionPreset="slideInBottom"
                    >
                      <AlertDialogOverlay></AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Deletar funcionário
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Você tem certeza? Essa alteração não poderá ser desfeita.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancelar
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => deleteEmployee(employee.id)}
                            ml={3}
                          >
                            Sim, deletar
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListEmployee;
