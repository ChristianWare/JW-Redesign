import Link from "next/link";
import Button from "../button/Button";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <header className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <Button text='JW' href='/' />
        </div>
        <div className={styles.navRight}>
          <ul className={styles.navmenu}>
            <li className={styles.navItem}>
              <Link href='/cart' passHref legacyBehavior>
                <a title='Contact Page'>Cart</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href='/login' passHref legacyBehavior>
                <a title='Contact Page'>Login</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Nav;
