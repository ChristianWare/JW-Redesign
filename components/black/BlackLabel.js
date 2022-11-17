import styles from "./BlackLabel.module.css";
import Image from "next/image";
import JW from "../../public/icons/jw.png";
import { useRouter } from "next/router";

const BlackLabel = () => {
  const router = useRouter();

  const onClick = () => {
    if (router.pathname === "/") {
      router.push("/black");
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
        <div className={styles.border}>
          <div className={styles.left}>
            <div className={styles.textContainer}>
              <p className={styles.jw}>JOHNNIE WALKER</p>
              <p className={styles.rl}>BLACK LABEL</p>
            </div>
            <div className={styles.lowerTop}>
              <div className={styles.imgContainer}>
                <Image src={JW} width='50' height='83' alt='image' />
              </div>
              <p className={styles.scriptText}>Blended Scotch Whisky</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlackLabel;
