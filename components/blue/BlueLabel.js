import styles from "./BlueLabel.module.css";
import { useRouter } from "next/router";

const BlueLabel = () => {
  const router = useRouter();

  const onClick = () => {
    if (router.pathname === "/") {
      router.push("/blue");
    } return
  }

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
          <div className={styles.jwblText}>
            <h4>JOHNNIE WALKER</h4>
            <h2>Blue Label</h2>
          </div>
            <h3 className={styles.scriptText}>John Walker & Sons</h3>
        </div>
      </div>
    </div>
  );
};
export default BlueLabel;
