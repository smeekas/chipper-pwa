import { url as backednUrl } from "./constants";

export function askForPermission() {
  Notification.requestPermission((result) => {
    console.log(result);
    if (result != "granted") {
      console.log("NO NOTIFICATION ACCESS");
      return;
    }
    configurePushSub();
    // displayConfirmNotification();
  });
}

export async function configurePushSub() {
  if (!navigator.serviceWorker) return;
  try {
    const sw = await navigator.serviceWorker.ready;
    const subscription = await sw.pushManager.getSubscription();
    sw.pushManager.getSubscription();
    console.log(subscription);
    if (subscription == null) {
      //no subscription so create new
      if (!import.meta.env.VITE_PUB_KEY) {
        alert("no key found");
        return;
      }
      const vapidPubKey = import.meta.env.VITE_PUB_KEY;
      const newSubscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPubKey),
      });
      const url = `${backednUrl}sub`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newSubscription),
      });
      if (response.ok) {
        displayConfirmNotification();
      }
    } else {
      //subscription already exists so use existing one
    }
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
export function displayConfirmNotification() {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.ready.then((sw) => {
    sw.showNotification("Successfully subscribed sw", {
      body: "thanks for subscribing to cheap twitter!",
      icon: "../assets/images/icons/app-icons-96x96.png",
      image: "../assets/images/sf-boat.jpg",
      vibrate: [100, 50, 100],
      badge: "../assets/images/icons/app-icons-96x96.png",
      tag: "confirm-notification", //like an ID
      renotify: true, //if notification with same tag pushed then should we alert user?
      actions: [
        {
          action: "confirm",
          title: "OKAY",
          icon: "../assets/images/icons/app-icons-96x96.png",
        },
        {
          action: "cancel",
          title: "CANCEL",
          icon: "../assets/images/icons/app-icons-96x96.png",
        },
      ],
    });
  });
  // new Notification("Successfully subscribed", {
  //   body: "thanks for subscribing to cheap twitter!",
  //   badge: "SS",
  // });
}
