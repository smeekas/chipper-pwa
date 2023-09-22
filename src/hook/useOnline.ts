import { useEffect, useState } from "react";

function useOnline() {
  const [online, setIsOnline] = useState(navigator.onLine);
  console.log(online);
  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);
  return online;
}

export default useOnline;
