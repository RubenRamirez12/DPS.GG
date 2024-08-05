import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: "http://localhost:5050"
//   }
// })

export default defineConfig({
  plugins: [react()],
  server: {
   open: true,
   proxy: {
    "/api": "http://127.0.0.1:5050"
   }
  },
});
