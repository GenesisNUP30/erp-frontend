import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/authSchema";
import useLogin from "../hooks/useLogin";

import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

export default function LoginForm() {
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data);
      console.log("login correcto");
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        helperText={errors.password?.message}
      />

      <FormControlLabel
        control={<Checkbox {...register("remember")} />}
        label="Recordar credenciales"
      />

      <Button type="submit" variant="contained" fullWidth>
        Iniciar sesión
      </Button>
    </form>
  );
}
