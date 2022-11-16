import Layout from "../components/layout/Layout";
import PageIntro from "../components/pageIntro/PageIntro";
import styles from "../styles/Thankyou.module.css";
import db from "../utils/db";
import Product from "../models/Product";
import ProductItem from "../components/productItem/ProductItem";
import { useContext } from "react";
import { Store } from "../utils/Store";

function ThankYou({ specialties }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Product has been added to cart");
  };

  return (
    <Layout title='Thank You'>
      <PageIntro
        title='Thank you for your purchase!'
        text='You will receive confirmation once order is shipped.'
        btnText='Contune Shopping'
        href='/'
      />
      {/* <Types /> */}
      <div className={styles.content}>
        <h2>You may also like .... </h2>
        <div className={styles.itemsGrid}>
          {specialties.slice(0, 4).map((product) => (
            <ProductItem
              key={product.slug}
              product={product}
              addToCartHandler={addToCartHandler}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

ThankYou.auth = true;
export default ThankYou;

export async function getServerSideProps() {
  await db.connect();
  const specialties = await Product.find({ label: "specialty" }).lean();

  return {
    props: {
      specialties: specialties.map(db.convertDocToObj),
    },
  };
}
