import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { useContext, useState, useEffect } from "react";
import { Store } from "../../utils/Store";
import Button from "../button/Button";
import styles from "./Nav.module.css";
import Cookies from "js-cookie";

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
              <Link href='/products' passHref>
                <a title='Contact Page'>Catalog</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href='/cart' passHref>
                <a title='Contact Page'>Cart</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href='/login' passHref>
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
