import { AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { RootState } from "../lib/store";
import { logIn } from "../lib/store/userSlice";

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;

export const LoginPage = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (user) {
      navigate("/boats");
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (data: LoginSchema) => {
    await dispatch(logIn(data));
  };

  return (
    <Flex justify="center" p={[6, null, 8, null, 16]}>
      <Box
        shadow={colorMode === "light" ? "md" : "none"}
        rounded="md"
        p={[6, null, 8, null, 16]}
        borderColor={colorMode === "light" ? "none" : "gray.700"}
        borderWidth={colorMode === "light" ? 0 : 1}
        w={["full", null, "auto"]}
      >
        <VStack spacing={4}>
          <Heading>Log In</Heading>
          <VStack
            as={"form"}
            spacing={4}
            align="center"
            alignSelf="center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl isRequired isInvalid={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <AtSignIcon />
                </InputLeftElement>
                <Input placeholder="Username" {...register("username")} />
              </InputGroup>
              {errors.username ? (
                <FormErrorMessage>{errors.username.message}</FormErrorMessage>
              ) : (
                !touchedFields.username && (
                  <FormHelperText>Enter your username.</FormHelperText>
                )
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  pr={12}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password")}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Toggle password visibility"
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              {errors.password ? (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              ) : (
                !touchedFields.password && (
                  <FormHelperText>Enter your password.</FormHelperText>
                )
              )}
            </FormControl>
            <Button type="submit" alignSelf="end">
              Log In
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
};
