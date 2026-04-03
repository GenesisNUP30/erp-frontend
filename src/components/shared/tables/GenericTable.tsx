import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Box, LinearProgress 
} from '@mui/material';

interface Props {
  headers: string[];
  loading?: boolean;
  children: React.ReactNode; 
}

export default function GenericTable({ headers, loading, children }: Props) {
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: '12px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden' 
        }}
      >
        {loading && <LinearProgress sx={{ position: 'absolute', width: '100%', top: 0 }} />}
        <Table>
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              {headers.map((h) => (
                <TableCell key={h} sx={{ fontWeight: 'bold' }}>{h}</TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {children}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}