import { useState } from 'react';

const useCarousel = ({ slides }) => {
  const [index, setIndex] = useState(0);

  const moveNextSlide = () => {
    const newIndex = (index + 1) % slides.length;
    setIndex(newIndex);
  };

  const movePrevSlide = () => {
    const newIndex = index > 0 ? index - 1 : slides.length - 1;
    setIndex(newIndex);
  };

  const moveByIndicators = (event) => {
    const { target } = event;

    const newIndex = +target.dataset.slideTo;

    if (newIndex || newIndex === 0) {
      setIndex(newIndex);
    }
  };

  return {
    moveNextSlide,
    movePrevSlide,
    moveByIndicators,
    index,
  };
};

export default useCarousel;
