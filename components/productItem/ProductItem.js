import styles from "./ProductItem.module.css";
import Image from "next/image";
import Button from "../button/Button";
import Link from "next/link";
import Button2 from "../button2/Button2";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href={`/products/${product.slug}`} passHref legacyBehavior>
          <a className={styles.name}>{product.name}</a>
        </Link>
        <p>{product.size}</p>
        <div className={styles.imgContainer}>
          <Image
            src={product.image}
            alt={product.name}
            objectFit='cover'
            layout='responsive'
            width='300'
            height='300'
          />
        </div>
        <p>Label: {product.label.toUpperCase()}</p>
        <p>${product.price}</p>
        <div className={styles.btnContainer}>
          <Button text='More Details' href={`/products/${product.slug}`} />
          <Button2
            text='Add to Cart'
            onClick={() => addToCartHandler(product)}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
