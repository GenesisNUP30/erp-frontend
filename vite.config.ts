import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: mode === 'production' 
      ? '/proyectos/2026/genesisnatalya/Proyecto_TFG/frontend/' 
      : '/',
  }
})
