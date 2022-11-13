import Nav2 from '../nav2/Nav2'
import ProductItem from '../productItem/ProductItem'
import styles from './PopProducts.module.css'

const PopProducts = () => {
  return (
    <>
    <Nav2 />
        <h2 className={styles.sectionTitle}>POPULAR PRODUCTS</h2>
        <div className={styles.products}>
        // this will have to be displayed through a grid of some sorts, via mapping:
          {/* <ProductItem /> */}
        </div>
    </>
  )
}
export default PopProducts