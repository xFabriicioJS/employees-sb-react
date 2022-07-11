import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import EmployeeAPIService from "../services/EmployeeAPIService";

function UpdateEmployee() {
  let navigate = useNavigate();
  let location = useLocation();

  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  const fetchData = async (id) => {
    try {
      let urlAPI = `http://localhost:8080/api/v1/employees/${id}`;

      const response = await fetch(`${urlAPI}`);
      const responseJSON = await response.json();
      setEmployee(responseJSON);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(location.state.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateData = (e) => {
    e.preventDefault();
    let newEmployee = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      id: employee.id,
    };

    EmployeeAPIService.updateEmployee(newEmployee, newEmployee.id).then(
      (res) => {
        console.log(res);
        navigate("/", { replace: true });
      }
    );
  };

  const isErrorFirstName = firstName === "";
  const isErrorLastName = lastName === "";
  const isErrorEmail = emailId === "";

  if (loading === false) {
    return (
      <div>
        <Box
          w="40%"
          backgroundColor="gray.100"
          p="10"
          m="auto"
          my="10"
          borderWidth="1px"
          borderRadius="lg"
        >
          <Heading size="lg" textAlign="center">
            Atualizar funcionário
          </Heading>
          <FormControl isInvalid={isErrorFirstName} mt="7">
            <FormLabel htmlFor="firstName">Nome</FormLabel>
            <Input
              id="firstName"
              type="text"
              placeholder={employee.firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {!isErrorFirstName ? (
              <FormHelperText>Insira o nome do funcionário</FormHelperText>
            ) : (
              <FormErrorMessage>O campo nome é requerido</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isErrorLastName}>
            <FormLabel htmlFor="lastName">Sobrenome</FormLabel>
            <Input
              id="lastName"
              type="text"
              placeholder={employee.lastName}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {!isErrorLastName ? (
              <FormHelperText>Insira o sobrenome do funcionário</FormHelperText>
            ) : (
              <FormErrorMessage>O campo sobrenome é requerido</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorEmail}>
            <FormLabel htmlFor="emailId">Email</FormLabel>
            <Input
              id="emailId"
              type="email"
              placeholder={employee.emailId}
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            {!isErrorLastName ? (
              <FormHelperText>Insira o email do funcionário</FormHelperText>
            ) : (
              <FormErrorMessage>O campo email é requerido</FormErrorMessage>
            )}
          </FormControl>
          <Stack
            direction="row"
            spacing={4}
            justifyContent="space-evenly"
            my="5"
          >
            <Button colorScheme="green" variant="solid" onClick={updateData}>
              Enviar
            </Button>
            <Link to="/">
              <Button colorScheme="red" variant="solid">
                <NavLink exact to="/">
                  Cancelar
                </NavLink>
              </Button>
            </Link>
          </Stack>
        </Box>
      </div>
    );
  } else {
    return (
      <Box>
        <Heading>Carregando...</Heading>
      </Box>
    );
  }
}

export default UpdateEmployee;
