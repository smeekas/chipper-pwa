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
            src: "/images/icons/app-icon-48x48.png",
            type: "image/png",
            sizes: "48x48",
          },
          {
            src: "/images/icons/app-icon-96x96.png",
            type: "image/png",
            sizes: "96x96",
          },
          {
            src: "/images/icons/app-icon-144x144.png",
            type: "image/png",
            sizes: "144x144",
          },
          {
            src: "/images/icons/app-icon-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
});
