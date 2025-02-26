import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api/": {
        target: "https://e-commer-backend-ew19.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/uploads/": {
        target: "https://e-commer-backend-ew19.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: ["e-commerce-frontend-dg0q.onrender.com"],
  },
});
