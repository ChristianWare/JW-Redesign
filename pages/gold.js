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
import GoldLabel from "../components/gold/GoldLabel";

const GoldPage = ({ gold }) => {
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
    <Layout title='gold'>
      <div className={styles.labelContainer}>
        <GoldLabel />
      </div>
      <PageIntro
        title='The Greatness of gold'
        text="A skillful fusion of rare aged whiskies inspired by the notes originally kept by Sir Alexander Walker. Crafted from only a small number of Scotland's most renowned distilleries. Exceptionally smooth, creamy and delicate. Available in limited edition bottle. Perfect for gifts."
        btnText='Catalog'
        href='/products'
      />
      <div className={styles.itemsGrid}>
        {gold.map((product) => (
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
export default GoldPage;

export async function getServerSideProps() {
  await db.connect();
  const gold = await Product.find({ label: "gold" }).lean();

  return {
    props: {
      gold: gold.map(db.convertDocToObj),
    },
  };
}
