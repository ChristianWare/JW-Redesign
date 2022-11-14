import styles from "./GreenLabel.module.css";
import Image from "next/image";
import JW from "../../public/icons/jw.png";
import Button from "../button/Button";

const GreenLabel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.border}>
        <div className={styles.left}>
          <div className={styles.textContainer}>
            <h4>JOHNNIE WALKER</h4>
            <h2>GREEN LABEL</h2>
            <hr className={styles.hr1} />
            <hr className={styles.hr2} />
            <div className={styles.imgContainer}>
              <Image src={JW} width='50' height='83' alt='image' />
            </div>
            <h3 className={styles.scriptText}>Blended Malt Scotch Whiskey</h3>
            <p>DISTILLED BLENDED AND BOTTLED IN SCOTTLAND</p>
          </div>
          {/* <div className={styles.lowerTop}></div> */}
        </div>
        <div className={styles.right}>
          <div className={styles.btnContainer}>
            <Button
              text='Shop Green Label'
              btnType='green'
              iconColor='whiteIcon'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GreenLabel;
