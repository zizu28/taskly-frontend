import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import UpdateTask from "./pages/UpdateTask.jsx";
import SingleTask from "./pages/SingleTask.jsx";
import Tasks from "./pages/Tasks.jsx";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Toaster position="bottom-right" />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/profile" Component={Profile} />
          <Route path="/tasks/createtask" Component={CreateTask} />
          <Route path="/tasks/updatetask/:id" Component={UpdateTask} />
          <Route path="/tasks/:id" Component={SingleTask} />
          <Route path="/tasks" Component={Tasks} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
