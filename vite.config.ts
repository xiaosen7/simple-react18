import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve("./src/react"),
      "react-dom": path.resolve("./src/react-dom"),
      shared: path.resolve("./src/shared"),
      reconciler: path.resolve("./src/reconciler"),
      scheduler: path.resolve("./src/scheduler"),
      logger: path.resolve("./src/logger"),
    },
  },
});
