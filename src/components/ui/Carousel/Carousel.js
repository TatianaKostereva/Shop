import React from 'react';
import CarouselSlides from '@/components/ui/Carousel/CarouselSlides';
import useCarousel from '@/components/ui/Carousel/hooks/useCarousel';

const Carousel = ({ slides }) => {
  const {
    index,
    moveNextSlide,
    movePrevSlide,
    moveByIndicators,
  } = useCarousel({ slides });

  return (
    <div id="mainCarousel" className="main-carousel carousel slide">
      <ol className="carousel-indicators" onClick={moveByIndicators}>
        {slides.map((_, slideIndex) => {
          const className = `carousel-indicator ${index === slideIndex && 'active'}`;
          return <li data-target="#mainCarousel" key={slideIndex} data-slide-to={slideIndex} className={className} />;
        })}
      </ol>
      <div className="carousel-inner">
        {slides.map((item, slideIndex) => <CarouselSlides carouselItem={item} key={slideIndex} current={index === slideIndex} />)}
      </div>
      <button className="carousel-control-prev" role="button" data-slide="prev" onClick={movePrevSlide}>
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </button>
      <button className="carousel-control-next" role="button" data-slide="next" onClick={moveNextSlide}>
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
