import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/authSchema";
import useLogin from "../hooks/useLogin";
import { useState } from "react";

import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

export default function LoginForm() {
  const { login } = useLogin();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: any) => {
    setLoginError(null);
    try {
      await login(data);
      console.log("login correcto");
    } catch (error) {
      setLoginError("Credenciales incorrectas o error de servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}
      <TextField
        label="Email o Usuario *"
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 255 }}
        {...register("login")}
        error={!!errors.login}
        helperText={errors.login?.message}
      />

      <TextField
        label="Contraseña *"
        type="password"
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 255 }}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message as string}
      />

      <FormControlLabel
        control={<Checkbox {...register("remember")} />}
        label="Recordar credenciales"
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? "Entrando..." : ''}
        Iniciar sesión
      </Button>
    </form>
  );
}
