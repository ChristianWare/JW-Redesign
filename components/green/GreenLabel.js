import styles from './GreenLabel.module.css'
import Image from "next/image";
import JW from "../../public/icons/jw.png";

const GreenLabel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.border}>
        <div className={styles.textContainer}>
          <h4>JOHNNIE WALKER</h4>
          <h2>GREEN LABEL</h2>
          <hr className={styles.hr1} />
          <hr className={styles.hr2} />
          <div className={styles.imgContainer}>
            <Image src={JW} width='50' height='83' />
          </div>
          <h3 className={styles.scriptText}>Blended Malt Scotch Whiskey</h3>
          <p>DISTILLED BLENDED AND BOTTLED IN SCOTTLAND</p>
        </div>
        <div className={styles.lowerTop}></div>
      </div>
    </div>
  );
}
export default GreenLabel