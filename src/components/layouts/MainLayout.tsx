import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* NAVBAR */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* SIDEBAR */}
      <Sidebar open={open} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
