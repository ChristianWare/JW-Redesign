import Button from "../button/Button";
import styles from "./Hero.module.css";
import ImageSlider from "../imageSlider/ImageSlider";
import { SlideData } from "../SlideData";

const hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <h1>THE GREATNESS OF JOHNNIE</h1>
          </div>
          <div className={styles.topRight}>
            <p>
              Johnnie Walker may be the best-known name in scotch, and it's also
              one of the most respected.
            </p>
            <div className={styles.btnContainer}>
              <Button text='View Categlog ' />
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <ImageSlider slides={SlideData} />
        </div>
      </div>
    </div>
  );
};
export default hero;
