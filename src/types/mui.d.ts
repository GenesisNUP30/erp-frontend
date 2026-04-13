import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    notifications: {
      main: string;
      text: string;
      border: string;
    };
    custom: {
      success: string;
      warning: string;
      danger: string;
    };
  }

  interface PaletteOptions {
    notifications?: {
      main?: string;
      text?: string;
      border?: string;
    };
    custom?: {
      success?: string;
      warning?: string;
      danger?: string;
    };
  }
}
