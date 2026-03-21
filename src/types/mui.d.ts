import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      success: string;
      warning: string;
      danger: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      success?: string;
      warning?: string;
      danger?: string;
    };
  }
}