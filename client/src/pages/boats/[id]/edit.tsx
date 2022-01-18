import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Tag,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BoatForm } from "../../../components/BoatForm";
import { BoatViewSkeleton } from "../../../components/BoatViewSkeleton";
import {
  useDeleteBoatMutation,
  useGetBoatByIdQuery,
} from "../../../lib/store/boatApi";

export const EditBoatPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { isLoading, data: boat } = useGetBoatByIdQuery({ id: parseInt(id!) });
  const [deleteBoat] = useDeleteBoatMutation();

  return (
    <>
      {isLoading || !boat ? (
        <BoatViewSkeleton />
      ) : (
        <VStack spacing={4} align="stretch">
          <Flex justify="space-between" w="full">
            <Heading>
              <Tag>{boat.id}</Tag> Edit Boat
            </Heading>
            <HStack spacing={2}>
              <IconButton
                as={Link}
                to={`/boats/${boat.id}`}
                aria-label="View boat."
                icon={<ViewIcon />}
              />
              <IconButton
                onClick={() => {
                  deleteBoat(boat.id);
                  navigate("/boats");
                }}
                aria-label="Delete boat."
                icon={<DeleteIcon />}
              />
            </HStack>
          </Flex>
          <BoatForm boat={boat} />
        </VStack>
      )}
    </>
  );
};
