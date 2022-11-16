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
import Redlabel from "../components/red/RedLabel";

const redPage = ({ red }) => {
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
    <Layout title='Red'>
      <div className={styles.labelContainer}>
        <Redlabel />
      </div>
      <PageIntro
        title='The Greatness of Red'
        text='Flowers that bloom into flames. Johnnie Walker Red Label is the world’s best-selling Scotch Whisky. And is made for mixing, both in exhilarating cocktails and with your favorite people. It brings together whiskies specially chosen for their bold, vibrant flavors that add a fiery kick to any mix.'
        btnText='Catalog'
        href='/products'
      />
      <div className={styles.itemsGrid}>
        {red.map((product) => (
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
export default redPage;

export async function getServerSideProps() {
  await db.connect();
  const red = await Product.find({ label: "red" }).lean();

  return {
    props: {
      red: red.map(db.convertDocToObj),
    },
  };
}
