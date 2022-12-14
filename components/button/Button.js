import Link from "next/link";
import styles from "./Button.module.css";
import Arrow from "../../public/icons/diag.svg";

function Button({
  text,
  href = "",
  btnType = "primary",
  iconColor = "darkIcon",
  onClick,
}) {
  return (
    <Link href={href} onClick={onClick}>
      <a className={styles.container}>
        <button className={styles[btnType]}>
          {text} <Arrow className={styles[iconColor]} />
        </button>
      </a>
    </Link>
  );
}

export default Button;
