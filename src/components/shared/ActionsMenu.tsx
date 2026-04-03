import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

export interface ActionOption {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
}

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  options: ActionOption[];
}

export default function ActionsMenu({ anchorEl, open, onClose, options }: Props) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {options.map((opt, index) => (
        <MenuItem key={index} onClick={() => { opt.onClick(); onClose(); }}>
          <ListItemIcon sx={{ color: opt.color }}>{opt.icon}</ListItemIcon>
          <ListItemText sx={{ color: opt.color }}>{opt.label}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}