import styles from "./ProductItem.module.css";
import Image from "next/image";
import Button from "../button/Button";
import Link from "next/link";
import Button2 from "../button2/Button2";
import { useRouter } from "next/router";

const ProductItem = ({ product, addToCartHandler, imgContainer = "small" }) => {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      onClick={() => router.push(`/products/${product.slug}`)}
    >
      <div className={styles.content}>
        <Link href={`/products/${product.slug}`} passHref>
          <a className={styles.name}>{product.name}</a>
        </Link>
        <p>{product.size}</p>
        <div className={styles[imgContainer]}>
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
        <p>${product.price.toLocaleString()}</p>
        <div className={styles.btnContainer}>
          <Button text='More Details' href={`/products/${product.slug}`} />
          <Button2
            text='Add to Cart'
            btnType='primary'
            iconColor='darkIcon'
            onClick={() => addToCartHandler(product)}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
