export function init() {
  window.addEventListener("load", () => {
    if (navigator.serviceWorker) {
      const swUrl =
        import.meta.env.MODE === "prod" ? `/sw.js` : "/dev-sw.js?dev-sw";

      navigator.serviceWorker.register(swUrl, { scope: "/", type: "module" });
    }
  });
}
