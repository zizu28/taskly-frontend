import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  actions,
  SelectUser,
  updateUser,
  deleteUser,
  logout,
} from "../features/auth/UserSlice.js";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Flex,
  Box,
  Heading,
  Text,
  Link,
  Input,
  Stack,
  FormControl,
  Button,
  FormErrorMessage,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import DeleteConfirmation from "../components/DeleteConfirmation.jsx";
import { useState } from "react";
import AvatarUploader from "../components/AvatarUploader.jsx";
import axios from "axios";

const Profile = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } =
    useSelector(SelectUser);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/profile");
    }
    dispatch(actions.reset());
  }, [user, isError, isLoading, isSuccess, message, dispatch, navigate]);

  const onSubmit = async (data) => {
    try {
      if (files.length > 0) {
        const newUrl = await handleFileUpload(files);
        if (newUrl) {
          data.avatar = newUrl;
        }
      }
      dispatch(updateUser(data));
      toast.success("Profile updated successfully");
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = () => {
    try {
      dispatch(deleteUser());
      toast.success("Profile deleted successfully");
      navigate("/signin");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileUpload = async (files) => {
    const IMAGE_API_URL = "http://localhost:5000/image/upload";

    if (!files || !files[0]) {
      throw new Error("Image file not provided");
    }

    // const user = JSON.parse(localStorage.getItem("User"));
    // if (!user) {
    //   throw new Error("User data not found in local storage.");
    // }

    // const token = user.token;
    // if (!token) {
    //   throw new Error("Token not provided");
    // }

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    // };

    try {
      const formData = new FormData();
      formData.append("image", files[0]);
      formData.append("upload_preset", "qmmfblrn");
      const res = await axios.post(IMAGE_API_URL, formData);
      const data = res.data;
      return data.secure_url;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const handleSignOut = () => {
    try {
      dispatch(logout());
      toast.success("Signed out successfully");
      navigate("/signin");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box p={3} maxW={"lg"} mx={"auto"}>
      <DeleteConfirmation
        alertTitle="Delete Profile"
        isOpen={isOpen}
        onClose={onClose}
        handleClick={handleDelete}
      />
      <Heading
        as={"h1"}
        fontSize={"3xl"}
        textAlign={"center"}
        fontWeight={"semibold"}
        my={7}
      >
        Your Profile
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Controller
            name="avatar"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <AvatarUploader
                onFieldChange={field.onChange}
                setFiles={setFiles}
                imageUrl={field.value}
              />
            )}
          />
          <FormControl isInvalid={errors.username}>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <Input
              type="email"
              placeholder="Email"
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
              placeholder="Password"
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
            textTransform={"uppercase"}
          >
            Update Profile
          </Button>
        </Stack>
      </form>
      <Stack gap={4} mt={5}>
        <Link
          as={RouterLink}
          to="/tasks/createtask"
          p={2}
          bg={"green.500"}
          rounded={"lg"}
          textTransform={"uppercase"}
          textAlign={"center"}
          textColor={"white"}
          fontWeight={"semibold"}
          _hover={{
            bg: "green.600",
          }}
        >
          Create New Task
        </Link>
        <Flex justify={"space-between"}>
          <Text
            as={"span"}
            color={"red.600"}
            cursor={"pointer"}
            onClick={onOpen}
          >
            Delete Account
          </Text>
          <Text
            as={"span"}
            color={"red.600"}
            cursor={"pointer"}
            onClick={handleSignOut}
          >
            Sign Out
          </Text>
        </Flex>
        <Text textAlign={"center"}>
          <Link
            as={RouterLink}
            to="/tasks"
            color={"teal"}
            cursor={"pointer"}
            _hover={{ textDecoration: "none" }}
          >
            Show Tasks
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default Profile;
