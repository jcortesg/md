import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

import {
  Container,
  ContainerProps,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Typography
} from "@mui/joy";
import axios from "axios";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
const BASE_URL = "http://localhost:3000/api/users/login";

export const Component = function Login(): JSX.Element {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleLogin = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    setError("");
    axios.post(BASE_URL, {
      user: {
        email: event.currentTarget.elements.email.value,
        password: event.currentTarget.elements.password.value,
      }
    }).then((response) => {
      setToken(response.data.user.token);
      navigate("/", { replace: true });
    }).catch((error) => {
      console.log(error);
      setError("Error con el usuario o contraseña");
    });
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "80%",
        gap: 1,
        maxWidth: "380px !important",
      }}
      maxWidth="xs"
    >
      <Typography sx={{ mb: 1, textAlign: "center" }} level="h2">
        Sign In
      </Typography>
      <Stack gap={4} sx={{ mt: 2 }}>
        <Typography color="danger" >{error}</Typography>
        <form
          onSubmit={(event: React.FormEvent<SignInFormElement>) => handleLogin(event) }
        >
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          <Stack gap={4} sx={{ mt: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
            </Box>
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export type LoginProps = Omit<ContainerProps, "children">;