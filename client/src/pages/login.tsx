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
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

type LoginSchema = yup.InferType<typeof loginSchema>;

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  const shadow = useColorModeValue("md", "none");
  const borderColor = useColorModeValue("none", "gray.700");

  return (
    <Flex justify="center" p={[6, null, 8, null, 16]}>
      <Box
        shadow={shadow}
        rounded="md"
        p={[6, null, 8, null, 16]}
        borderColor={borderColor}
        borderWidth={1}
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
