import styles from "./ProductItem.module.css";
import Image from "next/image";
import Link from "next/link";
import Button from "../button/Button";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>{product.name}</p>
        <p>{product.size}</p>
        <Image
          src={product.image}
          alt={product.name}
          // objectFit='cover'
          layout='responsive'
          width='200'
          height='200'
        />
        <p>Label: {product.label.toUpperCase()}</p>
        <p>${product.price}</p>
        <div className={styles.btnContainer}>
          <Button text='More Details' href={`/products/${product.slug}`} />
          <Button text='Add to Cart' btnType='orange' iconColor='whiteIcon' />
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
