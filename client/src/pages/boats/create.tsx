import { ArrowBackIcon } from "@chakra-ui/icons";
import { Heading, HStack, IconButton, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { BoatForm } from "../../components/BoatForm";

export const CreateBoatPage = () => {
  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4}>
        <IconButton
          as={Link}
          to={"/boats"}
          aria-label="View boats."
          icon={<ArrowBackIcon />}
        />
        <Heading>Create Boat</Heading>
      </HStack>
      <BoatForm />
    </VStack>
  );
};
