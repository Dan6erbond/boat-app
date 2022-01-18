import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Skeleton,
  Tag,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import {
  useDeleteBoatMutation,
  useGetBoatsQuery,
} from "../../lib/store/boatApi";

export const BoatsPage = () => {
  const { colorMode } = useColorMode();
  const { isLoading, data } = useGetBoatsQuery();
  const [deleteBoat] = useDeleteBoatMutation();

  return (
    <Box>
      <VStack spacing={4}>
        {isLoading || !data
          ? [...Array(10)].map((_, i) => (
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
                  <Skeleton height={12} width={36} />
                  <Box flexGrow={1} />
                  <Skeleton height={6} width={6} />
                  <Skeleton height={6} width={6} />
                </HStack>
              </Box>
            ))
          : data.map((boat) => (
              <Box
                as={Link}
                to={`/boats/${boat.id}`}
                shadow={colorMode === "light" ? "sm" : "none"}
                rounded="md"
                p={4}
                borderColor={colorMode === "light" ? "none" : "gray.700"}
                borderWidth={colorMode === "light" ? 0 : 1}
                _hover={
                  colorMode === "light"
                    ? { bg: "gray.100" }
                    : { bg: "gray.800" }
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
              </Box>
            ))}
      </VStack>
    </Box>
  );
};
