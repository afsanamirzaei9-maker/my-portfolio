
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // نام دقیق مخزن گیت‌هاب بین دو اسلش
  base: '/my-portfolio/', 
  build: {
    // تغییر نام پوشه خروجی از dist به docs
    outDir: 'docs', 
  }
})
