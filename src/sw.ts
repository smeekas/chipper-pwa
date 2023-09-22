/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

// import {workbox-precaching}  from 'workbox-precaching'
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { PostType } from "./components/Feed/Feed";
import { POST_STORE, clearAllData, writeData } from "./utils/indexDb";
// export default null;
// declare const self: ServiceWorkerGlobalScope;
self.addEventListener("install", () => self.skipWaiting());
precacheAndRoute(self.__WB_MANIFEST || []);
console.log(self);
self.addEventListener("activate", () => self.clients.claim());
// registerRoute((e) => {
//   console.log(e);
//   e.request.mode === "navigate";
// }, createHandlerBoundToURL("/index.html"));
registerRoute(
  /https:\/\/images\.unsplash\.com\/(.*?)$/,
  new StaleWhileRevalidate({
    cacheName: "immmagg",
  })
);
registerRoute(
  /http:\/\/localhost:3000\/\/(.*?)$/,
  new StaleWhileRevalidate({
    cacheName: "urls",
  })
);
registerRoute(
  /https:\/\/backend-l0yc\.onrender\.com\/\/static\/[a-zA-Z0-9_-]*\.[jpg|png]/,
  new StaleWhileRevalidate({ cacheName: "locall" })
);

registerRoute(/https:\/\/backend-l0yc\.onrender\.com\/\/$/, (e) => {
  return fetch(e.request).then((res) => {
    const clonedRes = res.clone();
    console.log(clearAllData);
    clearAllData(POST_STORE);
    return clonedRes.json().then((data: PostType) => {
      data.forEach((post) => {
        writeData(POST_STORE, post);
      });
      return res;
    });
  });
});

// registerRoute("asasasasssff", );
