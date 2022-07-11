import React from "react";
import { Heading, Box } from "@chakra-ui/react";

function Header() {
  return (
    <Box
      bgColor="teal"
      display="flex"
      w="100%"
      h="16"
      alignItems="center"
      rounded="sm"
      textColor="white"
    >
      <Heading size="lg">Gerenciamento de funcionários</Heading>
    </Box>
  );
}

export default Header;
