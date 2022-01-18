import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { BoatViewSkeleton } from "../../../components/BoatViewSkeleton";
import {
  useDeleteBoatMutation,
  useGetBoatByIdQuery,
} from "../../../lib/store/boatApi";

export const BoatPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data: boat } = useGetBoatByIdQuery({ id: parseInt(id!) });
  const [deleteBoat] = useDeleteBoatMutation();

  return (
    <Box>
      {isLoading || !boat ? (
        <BoatViewSkeleton />
      ) : (
        <VStack spacing={4} align="stretch">
          <Flex justify="space-between">
            <Heading>{boat.name}</Heading>
            <HStack spacing={2}>
              <IconButton
                as={Link}
                to={`/boats/${boat.id}/edit`}
                aria-label="Edit boat."
                icon={<EditIcon />}
              />
              <IconButton
                onClick={() => deleteBoat(boat.id)}
                aria-label="Delete boat."
                icon={<DeleteIcon />}
              />
            </HStack>
          </Flex>
          <Text>{boat.description}</Text>
        </VStack>
      )}
    </Box>
  );
};
