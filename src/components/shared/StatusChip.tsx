import { useState } from "react";
import { Box, Chip, Menu, MenuItem, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export interface StatusOption {
  label: string;
  value: string;
  color: "success" | "error" | "warning" | "info" | "default";
  icon?: React.ReactNode;
}

interface Props {
  currentValue: string;
  options: StatusOption[];
  onStatusChange?: (newValue: string) => void;
  canChange?: boolean;
}

export default function StatusChip({
  currentValue,
  options,
  onStatusChange,
  canChange = false,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Buscamos la configuración del estado actual
  const currentStatus =
    options.find((opt) => opt.value === currentValue) || options[0];

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (canChange) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (newValue: string) => {
    if (onStatusChange && newValue !== currentValue) {
      onStatusChange(newValue);
    }
    handleClose();
  };

  return (
    <Box>
      <Chip
        label={currentStatus.label}
        color={currentStatus.color}
        onClick={canChange ? handleClick : undefined}
        icon={
          currentStatus.icon ? (
            (currentStatus.icon as React.ReactElement)
          ) : (
            <CircleIcon sx={{ fontSize: "10px !important" }} />
          )
        }
        sx={{
          fontWeight: "bold",
          cursor: canChange ? "pointer" : "default",
          textTransform: "uppercase",
          fontSize: "0.75rem",
        }}
      />

      {canChange && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              selected={option.value === currentValue}
            >
              <Typography variant="body2">{option.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
    </Box>
  );
}
