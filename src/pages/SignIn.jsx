import {
  Box,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { SelectUser, login, actions } from "../features/auth/UserSlice.js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignIn = () => {
  // const { user, isError, isLoading, isSuccess, message } = useSelector(
  //   SelectUser
  // ) ?? {
  //   user: "",
  //   isError: false,
  //   isLoading: false,
  //   isSuccess: false,
  //   message: "",
  // };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const doSubmit = (values) => {
    try {
      dispatch(login(values));
      toast.success("Sign in successful. You are now logged in.");
      reset();
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
      reset();
    }
  };
  return (
    <Box p="3" maxW="lg" mx="auto">
      <Heading
        as="h1"
        textAlign="center"
        fontSize="3xl"
        fontWeight="semi-bold"
        my="7"
      >
        Enter your credentials
      </Heading>
      <form onSubmit={handleSubmit(doSubmit)}>
        <Stack gap={4}>
          <FormControl>
            <Input
              id="email"
              type="email"
              placeholder="email"
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="teal"
            textTransform="uppercase"
          >
            Sign in
          </Button>
        </Stack>
      </form>
      <Flex gap={2} mt={5}>
        <Text>Don't have an account?</Text>
        <Link to="/signup">
          <Text as="span" ml="1" color="blue.500">
            Sign up
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default SignIn;
