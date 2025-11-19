import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // **CRUCIAL FIX FOR GITHUB PAGES:**
  // Sets the base public path for deployment. 
  // It must match your repository name: /repo-name/
  base: '/portpolio/', 
  plugins: [react()],
})
