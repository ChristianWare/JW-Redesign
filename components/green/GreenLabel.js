import styles from "./GreenLabel.module.css";
import Image from "next/image";
import JW from "../../public/icons/jw.png";
import { useRouter } from "next/router";

const GreenLabel = () => {
const router = useRouter();

const onClick = () => {
  if (router.pathname === "/") {
    router.push("/green");
  }
  return;
};

  return (
    <div
      className={
        router.pathname === "/"
          ? styles.container + " " + styles.hover
          : styles.container
      }
      onClick={onClick}
    >
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default GreenLabel;
