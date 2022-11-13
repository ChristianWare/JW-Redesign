import styles from "./ProductItem.module.css";
import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.title}>title</p>
          <div className={styles.imgContainer}>
            <Image src={product.image} alt={product.name} />
          </div>
          <div className={styles.priceAddContainer}>
            <p>{product.label}</p>
            <p>{product.price}</p>
            <p>+</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductItem;
