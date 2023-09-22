import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
function NavBar() {
  return (
    <div className={styles.navbar}>
      <h2>Chipper</h2>
      <div className={styles.links}>
        <Link to={"/"}>Home</Link>
        <Link to={"/feed"}>Feed</Link>
      </div>
    </div>
  );
}

export default NavBar;
