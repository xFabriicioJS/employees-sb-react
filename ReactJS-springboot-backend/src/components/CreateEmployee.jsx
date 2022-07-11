import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

const urlAPI = "http://localhost:8080/api/v1/employees";

function CreateEmployee() {
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  const saveEmployee = (e) => {
    e.preventDefault();

    let employee = {
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      emailId: `${emailId}`,
    };

    fetch(urlAPI, {
      method: "POST",
      body: JSON.stringify(employee),
      headers: { "content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));

    navigate("/", { replace: true });
  };

  const isErrorFirstName = firstName === "";
  const isErrorLastName = lastName === "";
  const isErrorEmail = emailId === "";

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
          Adicionar funcionário
        </Heading>
        <FormControl isInvalid={isErrorFirstName} mt="7">
          <FormLabel htmlFor="firstName">Nome</FormLabel>
          <Input
            id="firstName"
            type="text"
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
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          {!isErrorLastName ? (
            <FormHelperText>Insira o email do funcionário</FormHelperText>
          ) : (
            <FormErrorMessage>O campo email é requerido</FormErrorMessage>
          )}
        </FormControl>
        <Stack direction="row" spacing={4} justifyContent="space-evenly" my="5">
          <Button colorScheme="green" variant="solid" onClick={saveEmployee}>
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
}

export default CreateEmployee;
