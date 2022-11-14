import styles from "./RedLabel.module.css";
import Image from "next/image";
import JW from "../../public/icons/jw.png";
import Button from "../button/Button";

const Redlabel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.border}>
        <div className={styles.left}>
          <div className={styles.textContainer}>
            <p className={styles.jw}>JOHNNIE WALKER</p>
            <p className={styles.rl}>RED LABEL</p>
            <p className={styles.bsw}>BLENDED SCOTCH WHISKEY</p>
          </div>
          <div className={styles.lowerTop}>
            <div className={styles.imgContainer}>
              <Image src={JW} width='50' height='83' alt='image' />
            </div>
            <p className={styles.scriptText}>John Walker & Sons</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.btnContainer}>
            <Button text='Shop Red Label' btnType='red' iconColor='whiteIcon' href='/red' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Redlabel;
