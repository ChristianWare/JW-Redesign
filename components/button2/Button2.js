import styles from "./Button2.module.css";
import Arrow from "../../public/icons/diag.svg";

const Button2 = ({
  text,
  onClick,
  btnType = "primary",
  iconColor = "whiteIcon",
  fullWidth='no',
}) => {
  return (
    <button
      className={styles[btnType] + " " + styles[fullWidth]}
      onClick={onClick}
    >
      {text} <Arrow className={styles[iconColor]} />
    </button>
  );
};
export default Button2;
