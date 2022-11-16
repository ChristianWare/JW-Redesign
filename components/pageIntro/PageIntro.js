import Button from "../button/Button";
import styles from "./PageIntro.module.css";
import { useRouter } from "next/router";

const PageIntro = ({ title, text, btnText, href }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <h1
              className={
                router.pathname === "/thankyou"
                  ? styles.title + " " + styles.green
                  : styles.title
              }
            >
              {title}
            </h1>
          </div>
          <div className={styles.topRight}>
            <p>{text}</p>
            <div className={styles.btnContainer}>
              <Button text={btnText} href={href} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageIntro;
