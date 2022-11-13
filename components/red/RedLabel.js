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
              <Image src={JW} width='50' height='83' />
            </div>
            <p className={styles.scriptText}>John Walker & Sons</p>
          </div>
        </div>
        <div className={styles.right}>
          <p>
            This nonage whiskey is a combination of 40 different powerful and
            spicy single malt and grain whiskies. It has a fruity nose with
            hints of pear, apple, and vanilla with some lively species. The
            sweet freshness remains on the tongue, but the most pronounced malt
            aromas are pepper, vanilla, cinnamon, and ginger. Some might find
            the herbal finish harsh, while others appreciate its long,
            sophisticated, and smoky flavors. In any case, this unique end could
            be considered as a signature of Johnnie Walker whiskies.
          </p>
          <div className={styles.btnContainer}>
            <Button text='Shop Red Label' btnType='red' iconColor='whiteIcon' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Redlabel;
