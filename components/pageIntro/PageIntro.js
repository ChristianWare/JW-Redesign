import Button from '../button/Button';
import styles from './PageIntro.module.css'

const PageIntro = ({ title, text, btnText, href }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <h1>{title}</h1>
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
export default PageIntro