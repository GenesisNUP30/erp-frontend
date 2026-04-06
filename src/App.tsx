import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  const baseName = import.meta.env.PROD
    ? "/proyectos/2026/genesisnatalya/Proyecto_TFG/erp_campoagricola"
    : "/";

  return (
    <>
      <ThemeProvider>
        <BrowserRouter basename={baseName}>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
