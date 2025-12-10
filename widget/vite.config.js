import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/widget.js",
      name: "TourWidget",
      fileName: "tour-widget",
      formats: ["iife"],   // single file, works with <script>
    },
    outDir: "dist",
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // Avoid multiple JS chunks
      },
    },
  },
});
