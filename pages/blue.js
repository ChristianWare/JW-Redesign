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
import BlueLabel from "../components/blue/BlueLabel";

const BluePage = ({ blue }) => {
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
    <Layout title='Blue'>
      <div className={styles.labelContainer}>
        <BlueLabel />
      </div>
      <PageIntro
        title='The Greatness of Blue'
        text='Scotland- Created from the rarest and most expensive whiskies in the world, individually numbered and produced in limited quantities. Johnnie Walker Blue has the authentic character and flavor of a traditional 19th century blend with traces of smoke, honey and spice on the silky finish.'
        btnText='Catalog'
        href='/products'
      />
      <div className={styles.itemsGrid}>
        {blue.map((product) => (
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
export default BluePage;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const blue = await Product.find({ label: "blue" }).lean();

  return {
    props: {
      blue: blue.map(db.convertDocToObj),
    },
  };
}
