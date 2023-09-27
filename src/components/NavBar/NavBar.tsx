/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { installPromopt } from "../../App";
import { askForPermission } from "../../utils/swUtils";
import { useEffect, useState } from "react";
function NavBar() {
  console.log(installPromopt);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const checkForExistingSubscription = async () => {
    navigator.serviceWorker.ready.then(async (sub) => {
      console.log(sub);
      const allSub = await sub.pushManager.getSubscription();
      console.log(allSub);
      if (allSub) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    });
  };
  useEffect(() => {
    checkForExistingSubscription();
  }, []);
  const onUnsubscribe = async () => {
    navigator.serviceWorker.ready
      .then(async (sub) => {
        return sub.pushManager.getSubscription();
      })
      .then((subscriptions) => subscriptions?.unsubscribe())
      .then((status) => {
        if (status) {
          setIsSubscribed(false);
        }
      });
  };
  const onClick = () => {
    if (installPromopt) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let installProm = installPromopt as any;
      installProm.prompt();
      installProm.userChoice.then((choiceResult: any) => {
        console.log(choiceResult);
        if (choiceResult.outcome === "dismissed") {
          console.log("install cancelled");
        } else {
          console.log("app installed");
        }
        installProm = null;
      });
    }
  };
  const onSubscribe = () => {
    askForPermission();
  };
  return (
    <div className={styles.navbar}>
      <h2>Chipper</h2>
      <div className={styles.links}>
        <Link to={"/"}>Home</Link>
        <Link to={"/feed"}>Feed</Link>
        {window.Notification && !isSubscribed && (
          <div onClick={onSubscribe}> {"Subscribe"}</div>
        )}
        {isSubscribed && <div onClick={onUnsubscribe}>UnSubscribe</div>}
        <div onClick={onClick}>Install</div>
      </div>
    </div>
  );
}

export default NavBar;
