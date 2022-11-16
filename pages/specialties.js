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

const SpecialtiesPage = ({ specialties }) => {
  console.log(specialties)
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
    <Layout title='specialties'>
      <PageIntro
        title='The Greatness of specialties'
        text='Infinitely collectable. The perfect gifts for whisky fans. These Johnnie Walker limited edition blends are only available for a short time. Discover exclusive bottle designs, gift sets and limited release blends for extra special moments.'
        btnText='Catalog'
        href='/products'
      />
      <div className={styles.itemsGrid}>
        {specialties.map((product) => (
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
export default SpecialtiesPage;

export async function getServerSideProps() {
  await db.connect();
  const specialties = await Product.find({ label: "specialty" }).lean();

  return {
    props: {
      specialties: specialties.map(db.convertDocToObj),
    },
  };
}
