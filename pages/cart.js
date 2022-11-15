import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styles from "../styles/Cart.module.css";
import Button2 from "../components/button2/Button2";
import Layout from "../components/layout/Layout";

function CartPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry, product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart");
  };

  return (
    <Layout title='Cart'>
      <h2 className={styles.cart}>ITEMS IN YOUR CART :</h2>
      {cartItems.length === 0 ? (
        <div>Cart Is Empty</div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className={styles.itemsContainer} key={item.slug}>
              <div className={styles.box}>
                <h6 className={styles.heading}>Product</h6>
                <div className={styles.imgName}>
                  <Link href={`/products/${item.slug}`}>
                    <a className={styles.imgLink}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                      />
                    </a>
                  </Link>
                  <p>{item.name}</p>
                </div>
              </div>
              <div className={styles.box}>
                <h6 className={styles.heading}>Quantity</h6>
                <div className={styles.select}>
                  <select
                    value={item.quantity}
                    onChange={(e) => updateCartHandler(item, e.target.value)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.box}>
                <h6 className={styles.heading}>Price</h6>
                <p>{item.price}</p>
              </div>
              <div className={styles.box}>
                <h6 className={styles.heading}>Remove</h6>
                <button onClick={() => removeItemHandler(item)}>x</button>
              </div>
            </div>
          ))}
        </>
      )}
      <div className={styles.subtotalCheckoutContainer}>
        <h5>
          Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
          {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
        </h5>
        <Button2
          text='Check Out'
          onClick={() => router.push("login?redirect=/shipping")}
        />
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
