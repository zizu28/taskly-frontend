import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FormControl,
  Input,
  Button,
  Text,
  Box,
  Flex,
  Heading,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { actions, SelectUser, createUser } from "../features/auth/UserSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { user, isError, isLoading, isSuccess, message } =
    useSelector(SelectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/signin");
    }
    dispatch(actions.reset());
  }, [user, isError, isLoading, isSuccess, message, dispatch, navigate]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const doSubmit = (values) => {
    try {
      dispatch(createUser(values));
      toast.success("Sign up successful. You are now logged in.");
      reset();
    } catch (error) {
      toast.error("Something went wrong.");
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
        Create An Account
      </Heading>
      <form onSubmit={handleSubmit(doSubmit)}>
        <Stack gap="4">
          <FormControl isInvalid={errors.username}>
            <Input
              id="username"
              type="text"
              placeholder="username"
              {...register("username", { required: "Username is required" })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
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
          <FormControl isInvalid={errors.password}>
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
            Sign up
          </Button>
        </Stack>
      </form>
      <Flex gap="2" mt="5">
        <Text>Have an account?</Text>
        <Link to="/signin">
          <Text as="span" color="blue.400">
            Sign in
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default SignUp;
