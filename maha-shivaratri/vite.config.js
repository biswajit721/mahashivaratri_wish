import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mahashivaratri_wish/'   // <-- crucial for GitHub Pages
})
