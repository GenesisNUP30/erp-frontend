import { Typography } from "@mui/material";
import { useAuthStore } from "../../auth/store/authStore";

export default function WelcomeMessage() {
  const user = useAuthStore((state) => state.user);

  return (
    <Typography variant="h5" sx={{ mb: 3 }}>
      {`Hola, ${user?.name ?? ""}`}
    </Typography>
  );
}
