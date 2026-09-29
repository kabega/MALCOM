import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: fileURLToPath(new URL("./frontend", import.meta.url)),
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  css: { postcss: fileURLToPath(new URL("./", import.meta.url)) },
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
  build: { outDir: fileURLToPath(new URL("./dist/frontend", import.meta.url)), emptyOutDir: true },
  plugins: [react(), {
    name: "frontend-preview-api",
    configureServer(server) {
      server.middlewares.use("/api", (_request, response) => {
        response.statusCode = 503;
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({ error: "Frontend preview: database is not connected." }));
      });
    },
  }],
});
