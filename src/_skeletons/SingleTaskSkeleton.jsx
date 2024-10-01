import { Box, Stack, Skeleton } from "@chakra-ui/react";

const SingleTaskSkeleton = () => {
  return (
    <Box p={5} maxW={"3lg"} mx={"auto"}>
      <Stack gap={4}>
        <Skeleton height="20px" my={10} />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Box>
  );
};

export default SingleTaskSkeleton;
