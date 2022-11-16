import styles from "../styles/Payment.module.css";
// import Layout from "../components/layout/Layout";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Button2 from "../components/button2/Button2";
import Button from "../components/button/Button";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required.");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title='Payment Method'>
      <form onSubmit={submitHandler} className={styles.formContent}>
        <h1 className={styles.title}>PAYMENT METHOD</h1>
        {["PayPal", "Venmo", "Credit Card"].map((payment) => (
          <div key={payment} className={styles.content}>
            <div className={styles.labelInputBox}>
              <input
                name='paymentMethod'
                id={payment}
                type='radio'
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <label className='p-2' htmlFor={payment}>
                {payment}
              </label>
            </div>
          </div>
        ))}
        <div className={styles.btnContainer}>
          <Button
            text='Back'
            btnType='primary'
            iconColor="darkIcon"
            href='/shipping'
          />
          <Button2 text='Next' btnType='orange' iconColor='whiteIcon' />
        </div>
      </form>
    </Layout>
  );
};
export default Payment;
