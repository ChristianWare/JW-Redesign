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
import GreenLabel from "../components/green/GreenLabel";

const GreenPage = ({ green }) => {
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
    <Layout title='Green'>
      <div className={styles.labelContainer}>
        <GreenLabel />
      </div>
      <PageIntro
        title='The Greatness of Green'
        text='Our only Scotch blended entirely with single malts. Johnnie Walker Green Label is a hidden gem with vibrant secrets to reveal. And with malts from the four corners of Scotland, aged for at least 15 years, it captures the distinct flavors of each landscape in perfect balance. A whisky that’s in harmony with nature.'
        btnText='Catalog'
        href='/products'
      />
      <div className={styles.itemsGrid}>
        {green.map((product) => (
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
export default GreenPage;

export async function getServerSideProps() {
  await db.connect();
  const green = await Product.find({ label: "green" }).lean();

  return {
    props: {
      green: green.map(db.convertDocToObj),
    },
  };
}
