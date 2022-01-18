import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Tag,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import {
  useDeleteBoatMutation,
  useGetBoatByIdQuery,
  useUpdateBoatMutation,
} from "../../../lib/store/boatApi";

const boatSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().min(10).required(),
});

export type BoatSchema = yup.InferType<typeof boatSchema>;

export const EditBoatPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoading, data: boat } = useGetBoatByIdQuery({ id: parseInt(id!) });
  const [updateBoat] = useUpdateBoatMutation();
  const [deleteBoat] = useDeleteBoatMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoatSchema>({
    resolver: yupResolver(boatSchema),
  });

  const onSubmit = (data: BoatSchema) => {
    updateBoat({ id: parseInt(id!), ...data });
  };

  return (
    <>
      {isLoading || !boat ? null : (
        <VStack spacing={4}>
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
          <VStack
            as="form"
            spacing={4}
            w="full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                value={boat.name}
                placeholder="Boat Name"
                {...register("name")}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={boat.description}
                placeholder="Boat Description"
                {...register("description")}
              />
              {errors.description && (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              )}
            </FormControl>
            <Button type="submit" alignSelf="end">
              Save
            </Button>
          </VStack>
        </VStack>
      )}
    </>
  );
};
