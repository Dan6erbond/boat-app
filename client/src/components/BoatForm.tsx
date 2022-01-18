import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  useCreateBoatMutation,
  useUpdateBoatMutation,
} from "../lib/store/boatApi";
import { Boat } from "../types/Boat";

interface BoatFormProps {
  boat?: Boat;
}

const boatSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required().min(10),
});

export type BoatSchema = yup.InferType<typeof boatSchema>;

export const BoatForm = ({ boat }: BoatFormProps) => {
  const navigate = useNavigate();

  const [createBoat] = useCreateBoatMutation();
  const [updateBoat] = useUpdateBoatMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<BoatSchema>({
    resolver: yupResolver(boatSchema),
    defaultValues: boat,
  });

  const onSubmit = async (value: BoatSchema) => {
    if (boat) {
      await updateBoat({ id: boat.id, ...value });
      navigate(`/boats/${boat.id}`);
    } else {
      const { data, error } = await createBoat(value) as any;
      if (data) {
        navigate(`/boats/${data.id}`);
      } else {
        const {
          data: { errors },
        } = error;
        for (const key in errors) {
          setError(key as keyof BoatSchema, {
            type: "manual",
            message: errors[key],
          });
        }
      }
    }
  };

  return (
    <VStack as="form" spacing={4} w="full" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={!!errors.name}>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Boat Name" {...register("name")} />
        {errors.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.description}>
        <FormLabel>Description</FormLabel>
        <Textarea placeholder="Boat Description" {...register("description")} />
        {errors.description && (
          <FormErrorMessage>{errors.description.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit" alignSelf="end">
        Save
      </Button>
    </VStack>
  );
};
