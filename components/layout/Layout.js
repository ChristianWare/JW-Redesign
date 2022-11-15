import styles from "./Layout.module.css";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState, useEffect } from "react";
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";
import Nav2 from "../nav2/Nav2";
import { useRouter } from "next/router";
import Button from "../button/Button";

const Layout = ({ children, title }) => {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Head>
        <title>{title ? title + " - Johnnie Walker" : "Johnnie Walker"}</title>
        <meta name='description' content='Ecommerce Website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <ToastContainer position='bottom-center' limit={1} />
        <header className={styles.navContainer}>
          <nav className={styles.navbar}>
            <div className={styles.navLeft}>
              <Button text='JW' href='/' />
            </div>
            <div className={styles.navRight}>
              <ul className={styles.navmenu}>
                <li className={styles.navItem}>
                  <Link href='/products' passHref legacyBehavior>
                    <a title='Contact Page'>Catalog</a>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href='/cart' passHref legacyBehavior>
                    <a title='Contact Page'>
                      {cartItemsCount > 0 ? (
                        <span className={styles.cartCount}>
                          Cart:({cartItemsCount})
                        </span>
                      ) : (
                        <span className={styles.cartCount}>Cart</span>
                      )}
                    </a>
                  </Link>
                </li>
                {session === "loading" ? (
                  "Loading"
                ) : session?.user ? (
                  <>
                    <li
                      className={styles.navItem}
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      {session?.user ? session.user.name : "Login"}
                    </li>
                    <div
                      className={
                        isOpen === false
                          ? styles.dropdownMenu
                          : styles.dropdownMenu + " " + styles.active
                      }
                    >
                      <ul>
                        <DropdownItem text='Profile' href='/' />
                        <DropdownItem text='Order History' href='/' />
                        {session.user.isAdmin && (
                          <DropdownItem text='Admin Dashboard' href='/' />
                        )}
                        <DropdownItem text='Profile' href='/' />
                        <DropdownItem
                          text='Logout'
                          href='/'
                          onClick={logoutHandler}
                        />
                      </ul>
                    </div>
                    {/* <li className={styles.navItem}>
                      <Link href='/login' passHref legacyBehavior>
                        <a title='Contact Page'>Profile</a>
                      </Link>
                    </li>
                    <li className={styles.navItem}>
                      <Link href='/login' passHref legacyBehavior>
                        <a title='Contact Page'>Order History</a>
                      </Link>
                    </li>
                    {session.user.isAdmin && (
                      <li className={styles.navItem}>
                        <Link href='/login' passHref legacyBehavior>
                          <a title='Contact Page'>Admin Dashboard</a>
                        </Link>
                      </li>
                    )}
                    <li className={styles.navItem}>
                      <a title='Contact Page' href='#' onClick={logoutHandler}>
                        Log Out
                      </a>
                    </li> */}
                  </>
                ) : (
                  <li className={styles.navItem}>
                    <Link href='/login'>
                      <a className='p-2'>Login</a>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </header>
        {router.pathname !== "/" && <Nav2 />}
        <div>{children}</div>
      </div>
    </>
  );
};

function DropdownItem({ href, text, onClick }) {
  return (
    <li className={styles.dropdownItem} onClick={onClick}>
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  );
}

export default Layout;
