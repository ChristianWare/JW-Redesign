import Layout from "../../components/layout/Layout";
import styles from "../../styles/Products.module.css";
import db from "../../utils/db";
import Product from "../../models/Product";
import { useContext } from "react";
import ProductItem from "../../components/productItem/ProductItem";
import { Store } from "../../utils/Store";
import PageIntro from "../../components/pageIntro/PageIntro";
import axios from "axios";
import { toast } from "react-toastify";

import Catalog from "../../components/catalog/Catalog";

export default function Products({ products }) {
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
    <Layout title='Products'>
    <div className={styles.labelContainer}>
      <Catalog />
    </div>
      <PageIntro
        title='All of Johnnies Whiskies'
        btnText='Home'
        href='/'
        text='Here you will find a collection of all of our whiskies that we have to offer. Feel free to select a category above '
      />
      <div className={styles.content}>
        <div className={styles.itemsGrid}>
          {products.map((product) => (
            <ProductItem
              key={product.slug}
              imgContainer='large'
              product={product}
              addToCartHandler={addToCartHandler}
            />
          ))}
        </div>{" "}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
