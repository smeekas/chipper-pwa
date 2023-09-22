import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "index.html",
      },
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      includeManifestIcons: false,
      injectRegister: "auto",
      devOptions: {
        enabled: true,
        type: "module",
      },
      manifest: {
        name: "YT Playlist Notifier",
        short_name: "YT Playlist Notifier",
        description: "Get notifications when YouTube playlists are updated.",
        theme_color: "#ced4da",
        icons: [
          {
            src: "vite.svg",
            sizes: "192x192",
            type: "image/svg",
          },
        ],
      },
    }),
  ],
});
