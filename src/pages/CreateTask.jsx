import TaskForm from "../components/TaskForm.jsx";
import { Box, Heading } from "@chakra-ui/react";

const CreateTask = () => {
  return (
    <Box p={3} maxW={"4xl"} mx={"auto"}>
      <Heading
        as={"h1"}
        fontSize={"3xl"}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        Create Task
      </Heading>
      <TaskForm type="create" />
    </Box>
  );
};

export default CreateTask;
