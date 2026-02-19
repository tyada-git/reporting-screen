import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
    host: true,
    proxy: {
      "/proxy": {
        target: "https://api-testing.early.app",
        rewrite: (path) => path.replace(/^\/proxy/, ""),
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("Origin", "https://product-testing.early.app");
          });
        },
      },
    },
  },
});
