import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { getError } from "../../utils/error";
import styles from "../../styles/OrderScreen.module.css";
import Button2 from "../../components/button2/Button2";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      state;
  }
}

function OrderScreen() {
  const { data: session } = useSession();
  // order/:id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const router = useRouter();
  const orderId = query.id;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successDeliver, successPay]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid successgully");
        router.push("/thankyou");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("Order is delivered");
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className={styles.title}>{`ORDER: ${orderId}`}</h1>
      {/* <h1 className={styles.title}>PAYMENT OPTIONS</h1> */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.detailsContainer}>
                <div className={styles.details}>
                  <h5>Shipping Address</h5>
                  <div>
                    {shippingAddress.fullName}
                    <br />
                    {shippingAddress.address}
                    <br />
                    {shippingAddress.city} {shippingAddress.postalCode} <br />{" "}
                    {shippingAddress.country}
                  </div>
                  {isDelivered ? (
                    <p className={styles.delivered}>
                      Delivered at {deliveredAt}
                    </p>
                  ) : (
                    <p className={styles.notDelivered}>Not delivered</p>
                  )}
                </div>
              </div>

              <div className={styles.detailsContainer}>
                <div className={styles.details}>
                  <div>
                    <h5>Payment Method Selected:</h5>
                    <div>{paymentMethod}</div>
                    {isPaid ? (
                      <p className={styles.delivered}>Paid at {paidAt}</p>
                    ) : (
                      <p className={styles.notDelivered}>Not paid</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.detailsContainer}>
                <div className={styles.details}>
                  <h5>Order Items</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <Link href={`/product/${item.slug}`}>
                              <a>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>
                                &nbsp;
                                {item.name}
                              </a>
                            </Link>
                          </td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toLocaleString()}</td>
                          <td>${item.quantity * item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div999 className={styles.detailsContainer}>
                <div className={styles.details}>
                  <h5 className={styles.orderSummary}>
                    {isPaid ? "Order Summary" : "Please Pay"}
                  </h5>
                  <ul>
                    <li className={styles.liFlex}>
                      <span>Items</span>${itemsPrice.toLocaleString()}
                    </li>
                    <li className={styles.liFlex}>
                      <span>Tax</span>${taxPrice.toLocaleString()}
                    </li>
                    <li className={styles.liFlex}>
                      <span>Shipping</span>${shippingPrice}
                    </li>
                    <li className={styles.liFlex}>
                      <span>Total</span>${totalPrice.toLocaleString()}
                    </li>
                  </ul>
                  {!isPaid && (
                    <div>
                      {isPending ? (
                        <div>Loading...</div>
                      ) : (
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      )}
                      {loadingPay && <div>Loading...</div>}
                    </div>
                  )}
                  {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                    <>
                      {loadingDeliver && <div>Loading...</div>}
                      <Button2
                        onClick={deliverOrderHandler}
                        text='Deliver Order'
                        btnType='orange'
                        fullWidth='yes'
                      />
                    </>
                  )}
                </div>
                <div className={styles.sampleCC}>
                  <h6>Sample CC Info</h6>
                  <p>
                    <span>Card #:</span>4032032607519649
                  </p>
                  <p>
                    <span>Exp. Date:</span>01/2023
                  </p>
                  <p>
                    <span>CVV:</span>834
                  </p>
                </div>
              </div999>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
