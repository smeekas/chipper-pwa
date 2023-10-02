/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

// import {workbox-precaching}  from 'workbox-precaching'
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { PostType } from "./components/Feed/Feed";
import {
  POST_STORE,
  SYNC,
  clearAllData,
  deleteItem,
  readAllData,
  writeData,
} from "./utils/indexDb";
import { url } from "./utils/constants";
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
// https://ucarecdn.com
registerRoute(
  /https:\/\/ucarecdn\.com\/[a-zA-Z0-9_-]*\.[jpg|png]/,
  new StaleWhileRevalidate({ cacheName: "locall" })
);

registerRoute(
  /https:\/\/backend-l0yc\.onrender\.com\/static\/[a-zA-Z0-9_-]*\.[jpg|png]/,
  new StaleWhileRevalidate({ cacheName: "locall" })
);
registerRoute(
  /https:\/\/firebasestorage.googleapis\.com\/(.*?)/,
  new StaleWhileRevalidate({
    cacheName: "firebase img",
  })
);
registerRoute(/https:\/\/backend-l0yc\.onrender\.com\/$/, (e) => {
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
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = JSON.parse(event.data.text());
    console.log(data);
    // let option = {
    //   body: data.content,
    // };
    event.waitUntil(
      self.registration.showNotification(data.postData.title, {
        body: data.content,
        data: data.postData,
      })
    );
  }
});
self.addEventListener("notificationclick", (e) => {
  // console.log(e);
  e.waitUntil(
    notificationIteraction(e.notification.data.id).then(() =>
      e.notification.close()
    )
  );
});
async function notificationIteraction(id: string) {
  // const clients = new Clients();

  // console.log(clients);
  const allClients = await self.clients.matchAll({ type: "window" });
  //allClients =all winndows
  const foundedClient = allClients.find((c) => c.type === "window");
  //If in all Windows we  find current window;
  if (foundedClient) {
    //if current window is open(exists) then we open new tab
    foundedClient.navigate(
      `https://react-pwa-three-green.vercel.app/post/${id}`
    );
    foundedClient.focus();
  } else {
    //we simply open new window
    self.clients &&
      self.clients.openWindow(
        `https://react-pwa-three-green.vercel.app/post/${id}`
      );
  }
}

self.addEventListener("sync", (e) => {
  console.log(e.tag);
  if (e.tag === "sync-post") {
    e.waitUntil(
      readAllData(SYNC).then((data) => {
        for (const postItem of data) {
          console.log(postItem);
          const postData = new FormData();
          postData.append("title", postItem.title);
          postData.append("location", postItem.location);
          postData.append("id", postItem.id);
          postData.append("image", postItem.image);
          fetch(url, {
            method: "POST",
            body: postData,
          })
            .then((res) => {
              if (res.ok) {
                deleteItem("sync-posts", postItem.id);
                console.log(data, "data synced successfully");
              }
            })
            .catch(() => {
              console.log("don;t clear posts which are stored for sync");
            });
        }
      })
    );
  }
});

/*
self.addEventListener("sync", (e) => {
  console.log("back sync", e);
  if (e.tag === "sync-new-post") {
    console.log("syncing...");
    e.waitUntil(
      readAllData("sync-posts").then((data) => {
        for (let dataItem of data) {
          const postData = new FormData();
          postData.append("title", dataItem.title);
          postData.append("location", dataItem.location);
          postData.append("id", dataItem.id);
          postData.append("image", dataItem.image);
          fetch(url, {
            method: "POST",
            body: postData,
          })
            .then((res) => {
              if (res.ok) {
                deleteItem("sync-posts", dataItem.id);
                console.log(data, "data synced successfully");
              }
            })
            .catch(() => {
              console.log("don;t clear posts which are stored for sync");
            });
        }
      })
    );
  }
});
*/
