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
        navigateFallback: "/",
      },
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      includeManifestIcons: false,
      injectRegister: "auto",
      // devOptions: {
      //   enabled: true,
      //   type: "module",
      // },
      manifest: {
        start_url: "/",

        name: "Chipper",
        short_name: "Chipper",
        description: "cheap social media.",
        theme_color: "#130cb7",
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
