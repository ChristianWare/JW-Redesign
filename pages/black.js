import { Store } from "../utils/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import Layout from "../components/layout/Layout";
import PageIntro from "../components/pageIntro/PageIntro";
import db from "../utils/db";
import Product from "../models/Product";
import styles from "../styles/Blue.module.css";
import ProductItem from "../components/productItem/ProductItem";
import BlackLabel from "../components/black/BlackLabel";

const BlackPage = ({ black }) => {
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
    <Layout title='black'>
      <div className={styles.labelContainer}>
        <BlackLabel />
      </div>
      <PageIntro
        title='The Greatness of Black'
        text='The original Walker family blend, handcrafted from as many as 40 of the finest Scotch whiskies aged a minimum of 12 years, for a smooth and robust blend. Rich smoky malt, peat and sherry fruit character deliver a satisfyingly complex flavor on the long, lingering finish.'
        btnText='Catalog'
        href='/products'
      />
      <div className={styles.itemsGrid}>
        {black.map((product) => (
          <ProductItem
            key={product.slug}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
};
export default BlackPage;

export async function getServerSideProps() {
  await db.connect();
  const black = await Product.find({ label: "black" }).lean();

  return {
    props: {
      black: black.map(db.convertDocToObj),
    },
  };
}
