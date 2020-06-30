import React, { useContext } from 'react';
import CarouselSlides from "@/components/CarouselSlides/CarouselSlides";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }


  render = () => {
    const carousel = this.props.slides;

    return (
    <div id="mainCarousel" className="main-carousel carousel slide">
    <ol className="carousel-indicators" onClick = {this.moveByIndicators}>
        <li data-target="#mainCarousel" data-slide-to="0" className="carousel-indicator active"></li>
        <li data-target="#mainCarousel" data-slide-to="1" className="carousel-indicator"></li>
        <li data-target="#mainCarousel" data-slide-to="2" className="carousel-indicator"></li>
    </ol>
    <div className="carousel-inner">
          {carousel.map((item) => {
              return <CarouselSlides carouselItem={item} />
          })}
    </div>
    <button className="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev" onClick= {this.movePrevSlide}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
    </button>
    <button className="carousel-control-next" href="#mainCarousel" role="button" data-slide="next" onClick= {this.moveNextSlide}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
    </button>
    </div>
    )
  }

  moveNextSlide = () => {

      const activeSlide = document.querySelector('.carousel-item.active');
      const currentSlideIndex = +activeSlide.dataset.id;

      let nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex ===  this.props.slides.length) {
        nextSlideIndex = 0;
      }

      this.showActiveSlide(nextSlideIndex);
      this.showActiveIndicator(nextSlideIndex);
  }

  movePrevSlide = () => {
      const activeSlide = document.querySelector('.carousel-item.active');
      const currentSlideIndex = +activeSlide.dataset.id;

      let prevSlideIndex = currentSlideIndex - 1;
      if (prevSlideIndex === -1) {
        prevSlideIndex = 2;
      }

      this.showActiveSlide(prevSlideIndex);
      this.showActiveIndicator(prevSlideIndex);
  }


  moveByIndicators = (event) =>  {
      const { target } = event;
      const currentSlideIndex = +target.dataset.slideTo;

      this.showActiveIndicator(currentSlideIndex);
      this.showActiveSlide(currentSlideIndex);
  }

  showActiveSlide = (slide) => {
      const activeSlide = document.querySelector('.carousel-item.active');
      activeSlide.classList.remove('active');

      const element = document.querySelector('.carousel');

      const slides = element.getElementsByClassName('carousel-item');
      for (const s of slides) {
          if (+s.dataset.id === slide) {
              s.classList.add('active');
          }
      }
  }

  showActiveIndicator = (slide) => {
      const element = document.querySelector('.carousel');
      const activeIndicator = element.querySelector('.carousel-indicator.active');
      activeIndicator.classList.remove('active');

      const carouselIndicators = element.getElementsByClassName('carousel-indicator');
      for (const i of carouselIndicators) {
          if (+i.dataset.slideTo === slide) {
              i.classList.add('active');
          }
      }
  }


  show() {
    this.render();
    this.moveNextSlide();
    this.movePrevSlide();
    this.moveByIndicators();
  }
}

export default Carousel;
