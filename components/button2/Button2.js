import styles from "./Button2.module.css";
import Arrow from "../../public/icons/diag.svg";

const Button2 = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      <a className={styles.container}>
        <button className={styles.primary}>
          {text} <Arrow className={styles.icon} />
        </button>
      </a>
    </button>
  );
};
export default Button2;
