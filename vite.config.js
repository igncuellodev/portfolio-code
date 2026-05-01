import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import webfontDl from "vite-plugin-webfont-dl"; // 1. Importar el plugin
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    webfontDl(), // 2. Añadirlo aquí para que descargue las fuentes automáticamente
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        medigo: resolve(__dirname, "medigo.html"), 
      },
    },
  },
});