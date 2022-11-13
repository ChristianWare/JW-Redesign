import Link from "next/link";

import styles from "./Nav2.module.css";

const Nav2 = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navmenu}>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>Blue</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>Green</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>Black</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>Gold</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>Specialties</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>18 years</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>King George</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>Blond</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>BICENTENARY</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>Celebratory</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/blue' passHref legacyBehavior>
            <a>Jane Walker</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav2;
