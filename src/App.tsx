import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import ThemeProvider from './providers/ThemeProvider';


function App() {
  

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
