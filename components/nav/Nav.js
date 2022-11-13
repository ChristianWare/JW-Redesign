import Link from "next/link";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <header className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <p className={styles.logo}>JW</p>
        </div>
        <div className={styles.navRight}>
          <ul className={styles.navmenu}>
            <li className={styles.navItem}>
              <Link href='/contact' passHref legacyBehavior>
                <a title='Contact Page'>Cart</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href='/contact' passHref legacyBehavior>
                <a title='Contact Page'>Name</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Nav;
