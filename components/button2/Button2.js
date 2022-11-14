import styles from "./Button2.module.css";
import Arrow from "../../public/icons/diag.svg";

const Button2 = ({ text, onClick }) => {
  return (
 
      <button className={styles.primary} onClick={onClick}>
        {text} <Arrow className={styles.icon} />
      </button>
  );
};
export default Button2;
