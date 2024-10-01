import { Skeleton, Stack } from "@chakra-ui/react";

const TasksSkeleton = () => {
  return (
    <Stack p={5} maxW={"3lg"} gap={4} mx={"auto"}>
      <Skeleton height="20px" my={7} />
      <Skeleton height="20px" />
      <Skeleton height="100px" />
    </Stack>
  );
};

export default TasksSkeleton;
