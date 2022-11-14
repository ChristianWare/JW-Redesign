import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";
import styles from "../../styles/Slug.module.css";
import Button from "../../components/button/Button";

const SlugPage = (props) => {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  //   if (!product) {
  //     return <Layout title='Product Not Found'>Product Not Found</Layout>;
  //   }

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
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <div className={styles.imgContainer}>
                <Image
                  src={product.image}
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
                <h6>Description</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae tenetur amet cum eveniet? Repudiandae debitis
                  mollitia reiciendis minus nemo labore impedit quibusdam, neque
                  ab fuga at ullam provident, dolorem adipisci.
                </p>
              </div>
              <div className={styles.headingTextContainer}>
                <h6 className={styles.h6}>Type</h6>
                <p>Scotch</p>
              </div>
              <div className={styles.headingTextContainer}>
                <h6 className={styles.h6}>ABV</h6>
                <p>40%</p>
              </div>
              <div className={styles.headingTextContainer}>
                <h6 className={styles.h6}>Taste</h6>
                <p>Rich, Smoke, Honey, Spice, Long</p>
              </div>
                <div className={styles.btnContainer}>
                  <Button text='Add To Cart' href='/' />
              </div>
            </div>
          </div>
          {/* <div className={styles.bottom}>
            <h2 className={styles.title}>YOU MAY BE INTERESTED IN ....</h2>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default SlugPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}


