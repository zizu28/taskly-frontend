import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectAllTasks, getTasks } from "../features/tasks/TaskSlice";
import { Link, useSearchParams } from "react-router-dom";
import {
  Box,
  Badge,
  Button,
  Flex,
  Heading,
  Select,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TasksSkeleton from "../_skeletons/TasksSkeleton";
import Pagination from "../components/Pagination.jsx";
import { BsArrowUp } from "react-icons/bs";

const Tasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");
  const orderBy = searchParams.get("orderBy");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User"));
  const tasks = useSelector(SelectAllTasks);
  const tasksPerPage = useSelector((state) => state.task.tasksPerPage);
  const currentPage = useSelector((state) => state.task.currentPage);
  const indexOfLastPage = currentPage * tasksPerPage;
  const indexOfFirstPage = indexOfLastPage - tasksPerPage;
  let visibleTasks = tasks.slice(indexOfFirstPage, indexOfLastPage);
  if (status) {
    visibleTasks = visibleTasks.filter((task) => task.status === status);
  }
  if (orderBy) {
    visibleTasks = visibleTasks.sort((a, b) => {
      if (orderBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (orderBy === "priority") {
        return a.priority - b.priority;
      } else if (orderBy === "status") {
        return a.status.localeCompare(b.status);
      }
      return a.due.localeCompare(b.due);
    });
  }

  const handleOrderBy = (value) => {
    searchParams.set("orderBy", value);
    setSearchParams(searchParams);
  };
  // Handle status filter in the backend
  const handleStatusFilter = (e) => {
    const value = e.target.value;
    if (value) {
      searchParams.set("status", value);
    } else {
      searchParams.delete("status");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!user) {
      toast.error(message);
      navigate("/login");
    }
    dispatch(getTasks());
    toast.success(`Tasks for user ${user.username} fetched successfully`);
  }, []);

  if (!tasks || !Array.isArray(tasks)) {
    return <TasksSkeleton />;
  }

  return (
    <Box p={5} maxW={"3lg"} mx={"auto"}>
      <Heading
        as={"h1"}
        my={7}
        fontSize={"3xl"}
        textAlign={"center"}
        fontWeight={"semibold"}
        color={"gray.700"}
      >
        Tasks to do
      </Heading>
      <Flex justify={"space-between"} mb={3}>
        <Box w={100}>
          <Select placeholder="All" onChange={handleStatusFilter}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
        </Box>
        <Button
          as={Link}
          to="/tasks/createtask"
          colorScheme="green"
          fontWeight={"semibold"}
          textTransform={"uppercase"}
        >
          Create New Task
        </Button>
      </Flex>
      <TableContainer>
        <Table px={3} border={"2px solid"} borderColor={"gray.100"}>
          <Thead>
            <Tr>
              <Th>
                <Flex
                  onClick={() => handleOrderBy("name")}
                  cursor={"pointer"}
                  alignItems={"center"}
                >
                  Task {orderBy === "name" ? <BsArrowUp /> : ""}
                </Flex>
              </Th>

              <Th>
                <Flex
                  onClick={() => handleOrderBy("priority")}
                  cursor={"pointer"}
                  alignItems={"center"}
                >
                  Priority {orderBy === "priority" ? <BsArrowUp /> : ""}
                </Flex>
              </Th>

              <Th>
                <Flex
                  onClick={() => handleOrderBy("status")}
                  cursor={"pointer"}
                  alignItems={"center"}
                >
                  Status {orderBy === "status" ? <BsArrowUp /> : ""}
                </Flex>
              </Th>

              <Th>
                <Flex
                  onClick={() => handleOrderBy("due")}
                  alignItems={"center"}
                  cursor={"pointer"}
                >
                  Due Date {orderBy === "due" ? <BsArrowUp /> : ""}
                </Flex>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {visibleTasks.map((task) => (
              <Tr key={task.name}>
                <Td>
                  <Link to={`/tasks/${task._id}`}>{task.name}</Link>
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      task.priority === "High"
                        ? "red"
                        : task.priority === "Medium"
                        ? "yellow"
                        : "green"
                    }
                  >
                    {task.priority}
                  </Badge>
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      task.status === "Pending"
                        ? "red"
                        : task.status === "In Progress"
                        ? "yellow"
                        : "green"
                    }
                  >
                    {task.status}
                  </Badge>
                </Td>
                <Td>
                  {task.due ? new Date(task.due).toLocaleDateString() : ""}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination totalNumOfTasks={tasks.length} />
    </Box>
  );
};

export default Tasks;
