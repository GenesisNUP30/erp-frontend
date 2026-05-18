import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[];
}

export default function TablePagination({
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
  perPageOptions = [3, 5, 10],
}: Props) {
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} flexWrap="wrap" gap={2}>
      {/* Total y filas por página */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          Filas por página:
        </Typography>
        <Select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          size="small"
          sx={{ minWidth: 70 }}
        >
          {perPageOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
        <Typography variant="body2" color="text.secondary">
          Total: {total}
        </Typography>
      </Box>

      {/* Controles de página */}
      <Box display="flex" alignItems="center" gap={0.5}>
        <IconButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} size="small">
          <ChevronLeftIcon />
        </IconButton>

        {pages.map((page) => (
          <IconButton
            key={page}
            onClick={() => onPageChange(page)}
            size="small"
            sx={{
              fontWeight: page === currentPage ? 'bold' : 'normal',
              bgcolor: page === currentPage ? 'primary.main' : 'transparent',
              color: page === currentPage ? 'white' : 'inherit',
              '&:hover': {
                bgcolor: page === currentPage ? 'primary.dark' : 'action.hover',
              },
              width: 32,
              height: 32,
            }}
          >
            {page}
          </IconButton>
        ))}

        <IconButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === lastPage} size="small">
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}