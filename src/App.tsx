import { AppLayout } from "./layouts/app/AppLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { themeLight } from "./themes/themeLight";

function App() {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;
