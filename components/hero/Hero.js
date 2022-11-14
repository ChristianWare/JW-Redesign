import Button from "../button/Button";
import styles from "./Hero.module.css";
import ImageSlider from "../imageSlider/ImageSlider";
import { SlideData } from "../slideData/SlideData";
import PageIntro from "../pageIntro/PageIntro";

const hero = () => {
  return (
    <>
      <PageIntro
        title='The Greatness of Johnnie'
        text="Johnnie Walker may be the best-known name in scotch, and it's
                also one of the most respected."
        btnText='View Categlog'
        href='/products'
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.bottom}>
            <ImageSlider slides={SlideData} />
          </div>
        </div>
      </div>
    </>
  );
};
export default hero;
