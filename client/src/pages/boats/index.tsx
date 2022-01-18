import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  SkeletonText,
  Tag,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteBoatMutation,
  useGetBoatsQuery,
} from "../../lib/store/boatApi";

export const BoatsPage = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { isLoading, data } = useGetBoatsQuery();
  const [deleteBoat] = useDeleteBoatMutation();

  return (
    <VStack spacing={4} align="stretch">
      <Flex justify="space-between" w="full">
        <Heading>Boats</Heading>
        <IconButton
          as={Link}
          to="/boats/create"
          aria-label="Create boat"
          icon={<AddIcon />}
          disabled={isLoading}
        />
      </Flex>
      <VStack spacing={4}>
        {isLoading || data === undefined ? (
          [...Array(10)].map((_, i) => (
            <Box
              shadow={colorMode === "light" ? "sm" : "none"}
              rounded="md"
              p={4}
              borderColor={colorMode === "light" ? "none" : "gray.700"}
              borderWidth={colorMode === "light" ? 0 : 1}
              w="full"
              key={i}
            >
              <HStack align="center" spacing={2}>
                <Skeleton height={4} width={6} />
                <Skeleton height={6} width={28} />
                <Box flexGrow={1} />
                <SkeletonText />
                <Box flexGrow={1} />
                <Skeleton height={6} width={6} />
                <Skeleton height={6} width={6} />
              </HStack>
            </Box>
          ))
        ) : data.length ? (
          data.map((boat) => (
            <Box
              as={Link}
              to={`/boats/${boat.id}`}
              shadow={colorMode === "light" ? "sm" : "none"}
              rounded="md"
              p={4}
              borderColor={colorMode === "light" ? "none" : "gray.700"}
              borderWidth={colorMode === "light" ? 0 : 1}
              _hover={
                colorMode === "light" ? { bg: "gray.100" } : { bg: "gray.800" }
              }
              w="full"
              cursor="pointer"
              key={boat.id}
            >
              <HStack align="center" spacing={2}>
                <Tag>{boat.id}</Tag>
                <Text fontWeight="bold">{boat.name}</Text>
                <Box flexGrow={1} />
                <Text color={colorMode === "light" ? "gray.100" : "gray.400"}>
                  {boat.description}
                </Text>
                <Box flexGrow={1} />
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/boats/${boat.id}/edit`);
                  }}
                  aria-label="Edit boat."
                  icon={<EditIcon />}
                />
                <IconButton
                  onClick={() => deleteBoat(boat.id)}
                  aria-label="Delete boat."
                  icon={<DeleteIcon />}
                />
              </HStack>
            </Box>
          ))
        ) : (
          <Text alignSelf="center">No boats found.</Text>
        )}
      </VStack>
    </VStack>
  );
};
