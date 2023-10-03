export function init() {
  window.addEventListener("load", () => {
    if (navigator.serviceWorker) {
      console.log(import.meta.env.MODE);
      const swUrl =
        import.meta.env.MODE === "production" ? `/sw.js` : "/dev-sw.js?dev-sw";
      navigator.serviceWorker.register(swUrl, { scope: "/", type: "module" });
    }
  });
}
