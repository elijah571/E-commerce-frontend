import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": {
        target: "https://e-commer-backend-ew19.onrender.com",
        changeOrigin: true,
        secure: true,
        ws: true,
      },
      "/uploads/": {
        target: "https://e-commer-backend-ew19.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
