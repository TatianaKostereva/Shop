import React, { useContext } from 'react';
import CarouselSlides from "@/components/CarouselSlides/CarouselSlides";

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0
    }
  }

  render = () => {
    const carousel = this.props.slides;

    return (
      <div id="mainCarousel" className="main-carousel carousel slide">
        <ol className="carousel-indicators" onClick={this.moveByIndicators}>
          {carousel.map((_, index) => {
            const className = `carousel-indicator ${index === this.state.current && "active"}`;
            const slideTo = `${index}`;
            return <li data-target="#mainCarousel" key={index} data-slide-to={slideTo} className={className} />
          })}
        </ol>
        <div className="carousel-inner">
          {carousel.map((item, index) => {
            return <CarouselSlides carouselItem={item} key={index} current={index === this.state.current} />
          })}
        </div>
        <button className="carousel-control-prev" role="button" data-slide="prev" onClick={this.movePrevSlide}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </button>
        <button className="carousel-control-next" role="button" data-slide="next" onClick={this.moveNextSlide}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    )
  };

  moveNextSlide = () => {
    this.setState({
      current: (this.state.current + 1) % (this.props.slides.length)
    });
  };

  movePrevSlide = () => {
    const next = this.state.current - 1;
    this.setState({
      current: next > -1 ? next : this.props.slides.length - 1
    });
  };


  moveByIndicators = (event) =>  {
    const { target } = event;

    const currentSlideIndex = +target.dataset.slideTo;

    if (currentSlideIndex || currentSlideIndex === 0) {
      this.setState({
        current: currentSlideIndex
      });
    }
  }

}

export default Carousel;
