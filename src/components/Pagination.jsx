import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import {
  onNavigateNext,
  onNavigatePrevious,
} from "../features/tasks/TaskSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Pagination = ({ totalNumOfTasks }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const tasksPerPage = useSelector((state) => state.task.tasksPerPage);
  const currentPage = useSelector((state) => state.task.currentPage);
  const totalPages = Math.ceil(totalNumOfTasks / tasksPerPage);

  const navigatePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      searchParams.set("page", newPage.toString());
      setSearchParams(searchParams);
      dispatch(onNavigatePrevious());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      const newPage = currentPage + 1;
      searchParams.set("page", newPage.toString());
      setSearchParams(searchParams);
      dispatch(onNavigateNext());
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Flex align={"center"} gap={2} mt={2}>
      <Text size={2}>
        Page {currentPage} of {totalPages}
      </Text>
      <Button isDisabled={currentPage === 1} onClick={navigatePrev}>
        <BsChevronLeft /> Previous
      </Button>
      <Button isDisabled={currentPage === totalPages} onClick={navigateNext}>
        Next <BsChevronRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
