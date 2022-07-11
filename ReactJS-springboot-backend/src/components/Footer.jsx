import { Box } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Box
      display="flex"
      alignItems="center"
      position="fixed"
      left="0"
      bottom="0"
      w="100%"
      justifyContent="center"
    >
      <footer>
        <span>Todos os direitos reservados 2022 @Fabricio Monteiro</span>
      </footer>
    </Box>
  );
}

export default Footer;
