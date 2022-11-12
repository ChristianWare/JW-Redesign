import BlueLabel from "../blue/BlueLabel";
import Button from "../button/Button";
import styles from "./Hero.module.css";
import JW from '../../public/icons/jw.png'
import Image from "next/image";

const hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <h1>THE GREATNESS OF JOHNNIE</h1>
          </div>
          <div className={styles.topRight}>
            <p>
              Johnnie Walker may be the best-known name in scotch, and it's also
              one of the most respected.
            </p>
            <Button text='View Categlog ' />
            <div className={styles.btnContainer}>
              carousel buttons will go here
            </div>
          </div>
        </div>
        {/* <Image src={JW} /> */}
        <div className={styles.bottom}>
          <BlueLabel />
        </div>
      </div>
    </div>
  );
};
export default hero;
