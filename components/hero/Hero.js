import Button from "../button/Button";
import styles from "./Hero.module.css";
import ImageSlider from "../imageSlider/ImageSlider";
import { SlideData } from "../slideData/SlideData";

const hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <h1 className={styles.title}>The Greatness of Johnnie</h1>
          <div className={styles.btnContainer}>
            <Button
              text='View Categlog'
              btnType='orange'
              iconColor='whiteIcon'
              href='/products'
            />
          </div>
        </div>
        <div className={styles.topRight}>
          <ImageSlider slides={SlideData} />
        </div>
      </div>
    </div>
  );
};
export default hero;
