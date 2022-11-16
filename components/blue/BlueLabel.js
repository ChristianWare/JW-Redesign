import styles from "./BlueLabel.module.css";
import Image from "next/image";
import JW from "../../public/icons/jw.png";
import { useRouter } from "next/router";

const BlueLabel = () => {
  const router = useRouter();

  return (
    <div
      className={
        router.pathname === "/"
          ? styles.container + " " + styles.hover
          : styles.container
      }
      onClick={() => router.push("/blue")}
    >
      <div className={styles.border}>
        <div className={styles.left}>
          <div className={styles.jwblText}>
            <h4>JOHNNIE WALKER</h4>
            <h2>Blue Label</h2>
          </div>
          <div className={styles.lowerTop}>
            <div className={styles.imgContainer}>
              <Image src={JW} width='50' height='83' alt='image' />
            </div>
            <h3 className={styles.scriptText}>John Walker & Sons</h3>
          </div>
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
};
export default BlueLabel;
