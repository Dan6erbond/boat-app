import { AtSignIcon, LockIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { RequireAuth } from "./components/RequireAuth";
import { RootState } from "./lib/store";
import { signOut } from "./lib/store/userSlice";
import { BoatsPage } from "./pages/boats";
import { CreateBoatPage } from "./pages/boats/create";
import { BoatPage } from "./pages/boats/[id]";
import { EditBoatPage } from "./pages/boats/[id]/edit";
import { LoginPage } from "./pages/login";
import { SignUpPage } from "./pages/sign-up";

function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();

  return (
    <Router>
      <Box
        className="App"
        bg={colorMode === "light" ? "gray.50" : "gray.900"}
        minH="100vh"
      >
        <Flex
          as="nav"
          px={4}
          py={2}
          borderBottom={colorMode === "light" ? "gray.200" : "gray.800"}
          borderBottomWidth={1}
          justify="space-between"
        >
          <Heading as={Link} to="/" size="lg">
            Boat App
          </Heading>
          <HStack spacing={2}>
            {user && (
              <>
                <AtSignIcon />{" "}
                <Text color="gray.500">
                  Logged in as:{" "}
                  <Text
                    as="span"
                    color={colorMode === "light" ? "black" : "white"}
                  >
                    {user.firstName} {user.lastName}
                  </Text>
                </Text>
                <IconButton
                  aria-label="Sign out"
                  icon={<LockIcon />}
                  onClick={() => dispatch(signOut())}
                />
              </>
            )}
            {colorMode === "light" ? (
              <IconButton
                aria-label="Switch color mode to dark mode"
                icon={<MoonIcon />}
                onClick={toggleColorMode}
              />
            ) : (
              <IconButton
                aria-label="Switch color mode to light mode"
                icon={<SunIcon />}
                onClick={toggleColorMode}
              />
            )}
          </HStack>
        </Flex>
        <Box p={4}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/boats">
              <Route
                index
                element={
                  <RequireAuth>
                    <BoatsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="create"
                element={
                  <RequireAuth>
                    <CreateBoatPage />
                  </RequireAuth>
                }
              />
              <Route
                path=":id"
                element={
                  <RequireAuth>
                    <BoatPage />
                  </RequireAuth>
                }
              />
              <Route
                path=":id/edit"
                element={
                  <RequireAuth>
                    <EditBoatPage />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
