import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";
import styles from "../../styles/Slug.module.css";
import Button from "../../components/button/Button";
import ProductItem from "../../components/productItem/ProductItem";
import Button2 from "../../components/button2/Button2";
import Layout from "../../components/layout/Layout";

const SlugPage = ({ product, similar }) => {
  // const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
    if (!product) {
      return <Layout title='Product Not Found'>Product Not Found</Layout>;
    }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <div className={styles.imgContainer}>
                <Image
                  src={product.image}
                  alt='image'
                  width={300}
                  height={300}
                  layout='responsive'
                  objectFit='cover'
                />
              </div>
            </div>
            <div className={styles.topRight}>
              <h1 className={styles.title}>
                {product.name} {product.size}
              </h1>
              <div className={styles.headingTextContainer}>
                <h3>${product.price}</h3>
                <div className={styles.btnContainer}>
                  <Button2 text='Add To Cart' onClick={addToCartHandler} />
                </div>
              </div>
              <div className={styles.headingTextContainer}>
                <h6>Description</h6>
                <p>{product.description}</p>
              </div>
              <div className={styles.headingTextContainer}>
                <h6 className={styles.h6}>Type</h6>
                <p>Scotch</p>
              </div>
              <div className={styles.headingTextContainer}>
                <h6 className={styles.h6}>ABV</h6>
                <p>{product.abv}%</p>
              </div>
              <div className={styles.headingTextContainer}>
                <h6 className={styles.h6}>Taste</h6>
                <p>{product.taste}</p>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <h4 className={styles.title}>
              {" "}
              Similar {product.label} label products ....
            </h4>
            <div className={styles.itemsGrid}>
              {similar.slice(0, 4).map((product) => (
                <ProductItem
                  key={product.slug}
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
            <div className={styles.bottomBtns}>
              <Button text='All Products' href='/products' />
              <Button text='Home' href='/' />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default SlugPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  const similar = await Product.find({ label: product.label }).lean();
  // await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
      similar: similar.map(db.convertDocToObj),
    },
  };
}
