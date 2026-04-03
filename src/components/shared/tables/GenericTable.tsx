import { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, IconButton, Box, LinearProgress 
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionsMenu from '../ActionsMenu'; 
import type { HeaderOption, TableActionHandlers } from './types';

interface Props extends TableActionHandlers {
  headers: HeaderOption[];
  items: any[];
  loading?: boolean;
  menuList: ('edit' | 'details' | 'delete')[];
  renderRow: (item: any) => React.ReactNode;
}

export default function GenericTable({ 
  headers, items, loading, menuList, renderRow, 
  onEdit, onDetails, onDelete 
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => setAnchorEl(null);

  // Mapeo de opciones basado en lo que pidas en menuList
  const options = [
    { 
      id: 'details', 
      label: 'Ver detalle', 
      icon: <VisibilityIcon fontSize="small" />, 
      action: onDetails 
    },
    { 
      id: 'edit', 
      label: 'Editar', 
      icon: <EditIcon fontSize="small" />, 
      action: onEdit 
    },
    { 
      id: 'delete', 
      label: 'Eliminar', 
      icon: <DeleteIcon fontSize="small" />, 
      action: onDelete, 
      color: 'error.main' 
    },
  ].filter(opt => menuList.includes(opt.id as any));

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <TableContainer component={Paper} sx={{ borderRadius: '16px', overflow: 'hidden', mb: 2 }}>
        {loading && <LinearProgress sx={{ position: 'absolute', width: '100%', top: 0 }} />}
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
            <TableRow>
              {headers.map((h) => (
                <TableCell key={h.id} align={h.align || 'left'} sx={{ fontWeight: 'bold' }}>
                  {h.label}
                </TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id || index} hover>
                {renderRow(item)}
                <TableCell align="right">
                  <IconButton onClick={(e) => handleOpenMenu(e, item)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ActionsMenu 
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        options={options.map(opt => ({
          label: opt.label,
          icon: opt.icon,
          color: opt.color,
          onClick: () => opt.action?.(selectedItem)
        }))}
      />
    </Box>
  );
}