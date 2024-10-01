import { Box, Stack, Skeleton, Flex } from "@chakra-ui/react";

const UpdateTaskSkeleton = () => {
  return (
    <Box p={3} maxW={"4xl"} mx={"auto"}>
      <Flex direction={"row"} mt={7} gap={4}>
        <Box width={"50%"}>
          <Stack gap={4}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
        <Box width={"50%"}>
          <Stack gap={4}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default UpdateTaskSkeleton;
