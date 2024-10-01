import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../features/auth/UserSlice.js";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("/api/users/current");
        if (!response.data) {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    };
    checkUser();
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
