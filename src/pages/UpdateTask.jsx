import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectTaskById } from "../features/tasks/TaskSlice.js";
import TaskForm from "../components/TaskForm.jsx";
import UpdateTaskSkeleton from "../_skeletons/UpdateTaskSkeleton.jsx";
import { Box, Heading } from "@chakra-ui/react";

const UpdateTask = () => {
  const { id } = useParams();
  const task = useSelector((state) => SelectTaskById(state, id));

  if (!task) {
    return <UpdateTaskSkeleton />;
  }

  return (
    <Box p={3} maxW={"4xl"} mx={"auto"}>
      <Heading
        as="h1"
        fontSize={"3xl"}
        fontWeight={"semibold"}
        textAlign={"center"}
        my={7}
      >
        Update Task
      </Heading>
      <TaskForm
        type="update"
        task={task}
        defaultValues={{
          name: task.name,
          description: task.description,
          priority: task.priority,
          status: task.status,
        }}
      />
    </Box>
  );
};

export default UpdateTask;
