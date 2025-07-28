import react from '@vitejs/plugin-react'
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@components": resolve(__dirname, "src/components"),
        "@hooks": resolve(__dirname, "src/hooks"),
        "@lib": resolve(__dirname, "src/lib"),
        "@services": resolve(__dirname, "src/services"),
        "@types": resolve(__dirname, "src/types"),
      },
    },
  };
});