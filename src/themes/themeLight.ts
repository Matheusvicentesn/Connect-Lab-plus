import { createTheme } from "@mui/material/styles";

export const themeLight = createTheme({
  palette: {
    primary: {
      main: "#00A355",
      dark: "#00863F",
      light: "#87C984",
      contrastText: "#3E5055",
      warn: "#EAB42A",
      error: "#D72736",
    },
    secondary: {
      main: "#00A355",
      dark: "#00a195",
      light: "#27bdbe",
      contrastText: "#3E5055",
      warn: "#D4A327",
      error: "#B91222",
    },
    background: {
      default: "#FFFFFF",
      paper: "#bedcbc",
      transparent: "transparent",
    },
    text: {
      default: "#FFFFFF",
      primary: "#3e5055",
      secondary: "#8b979f",
    },
  },
  typography: {
    fontFamily: ["museo-sans", "sans-serif"].join(","),
  },
});
