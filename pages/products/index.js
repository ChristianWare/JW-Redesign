import db from "../../utils/db";
import PageIntro from "../../components/pageIntro/PageIntro";
import Product from "../../models/Product";
import styles from "../../styles/ProductsPage.module.css";
import ProductItem from "../../components/productItem/ProductItem";
import { useContext } from "react";
import { Store } from "../../utils/Store";


export default function productspage ({ products }) {
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
    <>
      <PageIntro
        title='All of Johnnies whiskies'
        text='Here you will find a collection of all of our whiskies we have to offer. Feel free to selecta a category above.'
        btnText='Shop All'
        href='#'
      />
      <div className={styles.content}>
        <div className={styles.itemsGrid}>
          {products.map((product) => (
            <ProductItem
              key={product.slug}
              product={product}
              addToCartHandler={addToCartHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
