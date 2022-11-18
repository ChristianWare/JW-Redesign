import styles from "./Limited.module.css";
import { useRouter } from "next/router";

const Limited = () => {
  const router = useRouter();

  const onClick = () => {
    if (router.pathname === "/") {
      router.push("/specialties");
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
              <p className={styles.rl}>Limited Edition</p>
            </div>
            <div className={styles.lowerTop}>
              <p className={styles.scriptText}>John Walker & Sons</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Limited;
