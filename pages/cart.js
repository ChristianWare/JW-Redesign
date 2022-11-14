import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styles from "../styles/Cart.module.css";

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
    <div className={styles.container}>
      {cartItems.map((item) => (
        <h2 className={styles.cart}>CART ({item.quantity})</h2>
      ))}
      {cartItems.length === 0 ? (
        <div>Cart Is Empty</div>
      ) : (
        <table999>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.slug}>
                <td>
                  <Link href={`/product/${item.slug}`} legacyBehavior>
                    <a className='flex items-center'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                      &nbsp;
                      {item.name}
                    </a>
                  </Link>
                </td>
                <td>
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
                </td>
                <td className='p-5 text-right'>{item.price}</td>
                <td className='p-5 text-center'>
                  <button onClick={() => removeItemHandler(item)}>x</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table999>
      )}
      <div className='pb-3 text-xl'>
        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
        {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
      </div>
      <button
        onClick={() => router.push("login?redirect=/shipping")}
        className='primary-button w-full'
      >
        Check Out
      </button>
      {cartItems.map((item) => (
        <div className={styles.itemsContainer} key={item.slug}>
          <div className={styles.box}>
            <h6 className={styles.heading}>Product</h6>
            <div className={styles.imgName}>
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
              />
              <p>{item.name}</p>
            </div>
          </div>
          <div className={styles.box}>
            <h6 className={styles.heading}>Quantity</h6>
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
    </div>
  );
}

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
