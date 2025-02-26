import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://e-commer-backend-ew19.onrender.com",
      "/uploads/": "https://e-commer-backend-ew19.onrender.com",
    },
    allowedHosts: ["https://e-commerce-frontend-dg0q.onrender.com"],
  },
});
