import Link from "next/link";
import Button from "../button/Button";

import styles from "./Nav2.module.css";

const Nav2 = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navmenu}>
        <Button text='blue' href='/blue' />
        <Button text='red' href='red' />
        <Button text='green' href='/green' />
        <Button text='black' href='/black' />
        <Button text='gold' href='/gold' />
        <Button text='king george' href='/kingGeorge' />
        <Button text='Jane Walker' href='/janeWalker' />
        <Button text='specialties' href='/specialties' />
      </div>
    </nav>
  );
};
export default Nav2;
