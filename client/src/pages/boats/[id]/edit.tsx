import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteBoatMutation,
  useGetBoatByIdQuery,
} from "../../../lib/store/boatApi";

export const EditBoatPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data: boat } = useGetBoatByIdQuery({ id: parseInt(id!) });
  const [deleteBoat] = useDeleteBoatMutation();

  return (
    <>
      {isLoading || !boat ? null : (
        <Box>
          <Flex justify="space-between">
            <Heading>{boat.name}</Heading>
            <HStack spacing={2}>
              <IconButton
                as={Link}
                to={`/boats/${boat.id}`}
                aria-label="View boat."
                icon={<ViewIcon />}
              />
              <IconButton
                onClick={() => deleteBoat(boat.id)}
                aria-label="Delete boat."
                icon={<DeleteIcon />}
              />
            </HStack>
          </Flex>
          <Text>{boat.description}</Text>
        </Box>
      )}
    </>
  );
};
