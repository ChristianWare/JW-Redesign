import db from "../utils/db";
import { Store } from "../utils/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import Hero from "../components/hero/Hero";
import Product from "../models/Product";
import Nav2 from "../components/nav2/Nav2";
import ProductItem from "../components/productItem/ProductItem";
import styles from "../styles/Home.module.css";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";

export default function Home({ products, blue, green }) {
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
    <Layout title='Home'>
      <Hero />
      <Nav2 />
      <h2 className={styles.title}>BEST SELLERS</h2>
      <div className={styles.itemsGrid}>
        {products.slice(17, 21).map((product) => (
          <ProductItem
            key={product.slug}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Button
          text='See All'
          btnType='orange'
          iconColor='whiteIcon'
          href='/products'
        />
      </div>
      <h2 className={styles.title2}>BEST IN BLUE</h2>
      <div className={styles.itemsGrid}>
        {blue.map((product) => (
          <ProductItem
            key={product.slug}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Button
          text='All Blue'
          btnType='orange'
          iconColor='whiteIcon'
          href='/blue'
        />
      </div>
      <h2 className={styles.title}>GREEN GREATS</h2>
      <div className={styles.itemsGrid}>
        {green.map((product) => (
          <ProductItem
            key={product.slug}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Button
          text='All Green'
          btnType='orange'
          iconColor='whiteIcon'
          href='/green'
        />
      </div> 
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const blue = await Product.find({ label: "blue" }).lean();
  const green = await Product.find({ label: "green" }).lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
      blue: blue.map(db.convertDocToObj),
      green: green.map(db.convertDocToObj),
    },
  };
}
