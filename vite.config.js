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
    dedupe: [
      "react",
      "react-dom",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
    ],
  },
  base: "./", // ✅ Important for correct asset paths on Netlify
  build: {
    outDir: "dist", // ✅ Ensures the build output is in the correct directory
  },
});
