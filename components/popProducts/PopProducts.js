import Nav2 from '../nav2/Nav2'
import ProductItem from '../productItem/ProductItem'
import styles from './PopProducts.module.css'

const PopProducts = ({ products }) => {
  return (
    <>
      <Nav2 />
      <h2 className={styles.sectionTitle}>POPULAR PRODUCTS</h2>
    </>
  );
}
export default PopProducts