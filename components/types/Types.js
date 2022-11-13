import Image from "next/image";
import styles from "./Types.module.css";
import w1 from "../../public/images/w1.jpg";
import w2 from "../../public/images/w2.jpg";
import w3 from "../../public/images/w3.jpg";
import w4 from "../../public/images/w4.jpg";
import w5 from "../../public/images/w5.jpg";

const Types = () => {
  return (
    <section className={styles.container}>
      <h2>Types of Whisky</h2>
      <div className={styles.content}>
        <div className={styles.stuff}>
          <Image src={w1} layout='responsive' objectFit='cover' />
          <p>Scotch – Scotland</p>
        </div>
        <div className={styles.stuff}>
          <Image src={w2} layout='responsive' objectFit='cover' />
          <p>Bourbon – USA</p>
        </div>
        <div className={styles.stuff}>
          <Image src={w3} layout='responsive' objectFit='cover' />
          <p>Irish Whiskey – Ireland</p>
        </div>
        <div className={styles.stuff}>
          <Image src={w4} layout='responsive' objectFit='cover' />
          <p>Canadian Whiskey</p>
        </div>
        <div className={styles.stuff}>
          <Image src={w5} layout='responsive' objectFit='cover' />
          <p>Japanese Whisky</p>
        </div>
      </div>
    </section>
  );
};
export default Types;
