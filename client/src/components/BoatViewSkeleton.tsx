import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const BoatViewSkeleton = () => {
  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between">
          <Skeleton height={8} width={32} />
          <HStack spacing={2}>
            <Skeleton height={6} width={6} />
            <Skeleton height={6} width={6} />
          </HStack>
        </Flex>
        <SkeletonText />
      </VStack>
    </Box>
  );
};
