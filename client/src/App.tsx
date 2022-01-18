import { LockIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { BoatsPage } from "./pages/boats";
import { BoatPage } from "./pages/boats/[id]";
import { EditBoatPage } from "./pages/boats/[id]/edit";
import { LoginPage } from "./pages/login";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

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
          <Heading as={Link} to="/">
            Boat App
          </Heading>
          <HStack spacing={2}>
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
            <IconButton aria-label="Sign out" icon={<LockIcon />} />
          </HStack>
        </Flex>
        <Box p={4}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/boats">
              <Route index element={<BoatsPage />} />
              <Route path=":id" element={<BoatPage />} />
              <Route path=":id/edit" element={<EditBoatPage />} />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
