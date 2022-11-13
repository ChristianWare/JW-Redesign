import { useState } from "react";
import { SlideData } from "../SlideData";
import Left from "../../public/icons/leftChev.svg";
import Right from "../../public/icons/rightChev.svg";
import styles from "./ImageSlider.module.css";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const goToSlide = (slideIndex) => {
    setCurrent(slideIndex);
  };

  return (
    <section className='slider'>
      <div className={styles.sliderControls}>
        <Left onClick={prevSlide} className={styles.chevron} />
        {SlideData.map((slide, slideIndex) => {
          return (
            <div key={slideIndex} onClick={() => goToSlide(slideIndex)}>
              {current === slideIndex ? (
                <div className={styles.filled}>•</div>
              ) : (
                <div className={styles.hollow}>•</div>
              )}
            </div>
          );
        })}
        <Right onClick={nextSlide} className={styles.chevron} />
      </div>
      {SlideData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && <>{slide.slideComp}</>}
          </div>
        );
      })}
      <div className={styles.sliderControls}></div>
    </section>
  );
};
export default ImageSlider;
