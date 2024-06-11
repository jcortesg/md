import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

import {
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Typography,
  Select,
  Option,
} from "@mui/joy";
import axios from "axios";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  username: HTMLInputElement;
  role: HTMLSelectElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
const BASE_URL = "http://localhost:3000/api/users/";

export const Component = function Register(): JSX.Element {
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
        username: event.currentTarget.elements.username.value,
        role: (event.currentTarget.elements.role as HTMLSelectElement).value,
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
        Registro de Usuario
      </Typography>
      <Stack gap={4} sx={{ mt: 2 }}>
        <Typography color="danger" >{error}</Typography>
        <form
          onSubmit={(event: React.FormEvent<SignInFormElement>) => handleLogin(event)}
        >

          <FormControl required>
            <FormLabel>Username</FormLabel>
            <Input type="username" name="username" />
          </FormControl>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          <FormControl required>
            <FormLabel>Role</FormLabel>
            <Select defaultValue="creator" name="role">
              <Option value="creator">Creador</Option>
              <Option value="reader">Lector</Option>
            </Select>
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
              Registrate
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};