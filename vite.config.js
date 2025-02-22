import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  logLevel: "error", 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ Ensure alias is correct
    },
  },
  base: "./", // ✅ Important for correct asset paths on Netlify
  build: {
    outDir: "dist", // ✅ Ensures the build output is in the correct directory
  },
});
