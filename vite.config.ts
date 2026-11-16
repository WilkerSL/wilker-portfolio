import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2023",
    assetsInlineLimit: 2048,
    chunkSizeWarningLimit: 1600,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "three", test: /node_modules[\\/](three|@react-three|three-stdlib)[\\/]/ },
            { name: "motion", test: /node_modules[\\/](gsap|@gsap|motion|framer-motion|motion-dom|motion-utils)[\\/]/ },
          ],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
  optimizeDeps: {
    include: ["three/addons/geometries/RoundedBoxGeometry.js", "three/addons/utils/SkeletonUtils.js"],
  },
});
