import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/UserSlice";
import {
  Flex,
  Box,
  Spacer,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { SelectUser } from "../features/auth/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(SelectUser);

  const localStorageUser = localStorage.getItem("User");
  const handleSignOut = () => {
    try {
      dispatch(logout());
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box as="nav" bg="red.50">
      <Flex
        minW="max-content"
        alignItems="center"
        p="12px"
        maxW="7xl"
        m="0 auto"
      >
        <Box p="2">
          <ChakraLink as={RouterLink} fontSize="lg" fontWeight="bold" to="/">
            Taskly
          </ChakraLink>
        </Box>
        <Spacer />
        <Box>
          {user && localStorageUser ? (
            <Menu>
              <MenuButton>
                <Image
                  boxSize={20}
                  borderRadius="full"
                  src=""
                  alt="User profile picture"
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem as={RouterLink} to="/tasks">
                  Tasks
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <ChakraLink as={RouterLink} to="/signin">
              Sign In
            </ChakraLink>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
