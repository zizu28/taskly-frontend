import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  Stack,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { updateTask, createTask } from "../features/tasks/TaskSlice.js";
import { useDispatch } from "react-redux";

function TaskForm({ type, task, defaultValues }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: defaultValues });

  const doSubmit = (data) => {
    if (type === "create") {
      dispatch(createTask(data));
      toast.success(`Task created successfully`);
      navigate(`/tasks`);
    } else {
      dispatch(updateTask({ id, taskData: data }));
      toast.success(`Task updated successfully`);
      navigate(`/tasks`);
    }
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <Stack direction={{ base: "column", md: "row" }} gap={4}>
        <Flex gap={4} direction="column" flex={1}>
          <FormControl isInvalid={errors.name}>
            <Input
              id="name"
              type="text"
              placeholder="Task name"
              {...register("name", {
                required: "Task name is required",
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.description}>
            <Textarea
              id="description"
              type="text"
              placeholder="Task description"
              rows={4}
              {...register("description", {
                required: "Task description is required",
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex gap={4} direction="column" flex={1}>
          <FormControl isInvalid={errors.priority}>
            <Select
              id="priority"
              placeholder="Priority"
              {...register("priority", {
                required: "Priority is required",
              })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
            <FormErrorMessage>
              {errors.priority && errors.priority.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.status}>
            <Select
              id="status"
              placeholder="Status"
              {...register("status", { required: "Status is required" })}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Select>
            <FormErrorMessage>
              {errors.status && errors.status.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors.due}
            sx={{ ".react-datepicker-wrapper": { width: "100%" } }}
          >
            {/* <DatePickerStyles /> */}
            <Controller
              name="due"
              control={control}
              render={({ field }) => (
                <Input
                  as={DatePicker}
                  {...field}
                  id="due"
                  placeholderText="Due date (Optional)"
                  selected={field.value}
                  showTimeSelect
                  timeInputLabel="Time: "
                  dateFormat="MM/dd/yyyy h:mm aa"
                />
              )}
            />
            <FormErrorMessage>
              {errors.due && errors.due.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            textTransform={"uppercase"}
            isLoading={isSubmitting}
          >
            {type === "create" ? "Create Task" : "Update Task"}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}

export default TaskForm;
