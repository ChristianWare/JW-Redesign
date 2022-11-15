import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import Image from "next/image";
import { getError } from "../utils/error";
import Cookies from "js-cookie";
import styles from "../styles/PlaceOrderScreen.module.css";
import Button2 from "../components/button2/Button2";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title='Place order'>
      <h1 className={styles.title}>CONFIRM THE FOLLOWING:</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href='/'>Go Shopping</Link>
        </div>
      ) : (
        <div>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.detailsContainer}>
                <div className={styles.details}>
                  <h5>Shipping Address</h5>
                  <div>
                    {shippingAddress.fullName} <br />
                    {shippingAddress.address} <br />
                    {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                    {shippingAddress.country}
                  </div>
                  <div>
                    <Link href='/shipping'>
                      <a className={styles.edit}>Edit</a>
                    </Link>
                  </div>
                </div>
                <div className={styles.details}>
                  <h5>Payment Method</h5>
                  <div>{paymentMethod}</div>
                  <div>
                    <Link href='/payment'>
                      <a className={styles.edit}>Edit</a>
                    </Link>
                  </div>
                </div>
                <div className={styles.details}>
                  <h5>Order Items</h5>
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

                        <p>{item.quantity}</p>
                      </div>
                      <div className={styles.box}>
                        <h6 className={styles.heading}>Price</h6>
                        <p>{item.price}</p>
                      </div>
                    </div>
                  ))}
                  <div>
                    <Link href='/cart'>
                      <a className={styles.edit}>Edit</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.detailsContainer}>
                <div className={styles.details}>
                  <h5 className={styles.orderSummary}>Order Summary</h5>
                  <ul>
                    <li className={styles.liFlex}>
                      <span>Items</span>${itemsPrice}
                    </li>
                    <li className={styles.liFlex}>
                      <span>Tax</span>${taxPrice}
                    </li>
                    <li className={styles.liFlex}>
                      <span>Shipping</span>${shippingPrice}
                    </li>
                    <li className={styles.liFlex}>
                      <span>Total</span>${totalPrice}
                    </li>
                  </ul>
                </div>
                <Button2 text="Place Order" btnType="orange" iconColor="whiteIcon" onClick={placeOrderHandler}>
                  {loading ? "Loading..." : "Place order"}
                </Button2>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
