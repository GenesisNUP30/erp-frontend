import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "../shared/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  //const [open, setOpen] = useState(true);
  const [open] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
