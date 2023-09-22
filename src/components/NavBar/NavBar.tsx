/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { installPromopt } from "../../App";
function NavBar() {
  console.log(installPromopt);
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
  return (
    <div className={styles.navbar}>
      <h2>Chipper</h2>
      <div className={styles.links}>
        <Link to={"/"}>Home</Link>
        <Link to={"/feed"}>Feed</Link>
        <div onClick={onClick}>Install</div>
      </div>
    </div>
  );
}

export default NavBar;
