import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Link,
  Card,
  CardBody,
} from "@chakra-ui/react";
import SingleTaskSkeleton from "../_skeletons/SingleTaskSkeleton.jsx";
import { BsChevronLeft } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { SelectTaskById, deleteTask } from "../features/tasks/TaskSlice.js";
import toast from "react-hot-toast";
import { useDisclosure } from "@chakra-ui/react";
import DeleteConfirmation from "../components/DeleteConfirmation.jsx";

const SingleTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state) => SelectTaskById(state, id));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully");
    navigate("/tasks");
  };

  if (!task) {
    return <SingleTaskSkeleton />;
  }
  return (
    <Box p={3} maxW={"lg"} mx={"auto"}>
      <Link
        as={RouterLink}
        to="/tasks"
        color={"teal"}
        _hover={{ textDecor: "none" }}
        display={"flex"}
        alignItems={"center"}
      >
        <BsChevronLeft /> All Tasks
      </Link>
      <Heading
        fontSize={"3xl"}
        fontWeight={"semibold"}
        textAlign={"center"}
        my={7}
      >
        {task.name}
      </Heading>
      <HStack justify={"space-between"}>
        <Badge
          fontSize={"md"}
          colorScheme={
            task.status === "Completed"
              ? "green"
              : task.status === "In Progress"
              ? "yellow"
              : "red"
          }
        >
          {task.status}
        </Badge>
        {task.due && (
          <Text>{new Date(task.due).toLocaleDateString("en-US")}</Text>
        )}
      </HStack>
      <Card mt={4} border={"1px solid gray.200"}>
        <CardBody>
          <Text>{task.description}</Text>
        </CardBody>
      </Card>
      <Flex justify={"space-between"} mt={5}>
        <Text as={"span"} cursor={"pointer"} color={"red.600"} onClick={onOpen}>
          Delete Task
        </Text>
        <Link
          as={RouterLink}
          to={`/tasks/updatetask/${task._id}`}
          color={"teal"}
          _hover={{ textDecor: "none" }}
        >
          Edit Task
        </Link>
      </Flex>
      <DeleteConfirmation
        alertTitle={"Delete Task"}
        isOpen={isOpen}
        onClose={onClose}
        handleClick={handleDelete}
      />
    </Box>
  );
};

export default SingleTask;
