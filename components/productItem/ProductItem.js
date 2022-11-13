import styles from "./ProductItem.module.css";
import Link from "next/link";
import Image from "next/image";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <p>{product.name}</p>
          <p>{product.size}</p>
          <Image
            src={product.image}
            alt={product.name}
            // objectFit='cover'
            layout="responsive"
            width='200'
            height='200'
          />
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
