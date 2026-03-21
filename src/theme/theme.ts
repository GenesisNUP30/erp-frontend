import { createTheme } from '@mui/material/styles';
import { palette } from './pallete';


export const theme = createTheme({
  palette: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.background,
  },
});