import { useReducer } from "react";
import styles from "./Layout.module.css";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState, useEffect } from "react";
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";
import Nav from "../nav/Nav";
import Nav2 from "../nav2/Nav2";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

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
    <div className={styles.container}>
      <ToastContainer position='bottom-center' limit={1} />
      <Nav />
      {router.pathname !== '/' && <Nav2 /> }
      
      <div>{children}</div>
    </div>
  );
};
export default Layout;
