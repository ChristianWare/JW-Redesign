import styles from "./BlueLabel.module.css";
import Image from "next/image";
import JW from "../../public/icons/jw.png";

const BlueLabel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.border}>
        <div className={styles.jwblText}>
          <h4>JOHNNIE WALKER</h4>
          <h2>Blue Label</h2>
          <h3>BLENDED SCOTCH WHISKEY</h3>
          <hr className={styles.divider} />
        </div>
        <div className={styles.lowerTop}>
          <h3 className={styles.smallText}>A BLEND OF OUR RAREST WHISKEYS</h3>
          <div className={styles.imgContainer}>
            <Image src={JW} width='50' height='83' />
          </div>
          <h3 className={styles.scriptText}>John Walker & Sons</h3>
        </div>
      </div>
    </div>
  );
};
export default BlueLabel;
