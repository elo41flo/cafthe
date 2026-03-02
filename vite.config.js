import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // On force la base à '/' pour que Vercel trouve toujours le dossier /assets
  base: '/', 
  build: {
    // On s'assure que le dossier de sortie est bien celui attendu par Vercel
    outDir: 'dist',
  }
})