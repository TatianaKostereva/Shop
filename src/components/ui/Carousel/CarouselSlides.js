import React from 'react';

const CarouselSlides = ({ carouselItem, current }) => {
  const className = `carousel-item ${current && 'active'}`;

  return (
    <div className={className}>
      <img src={carouselItem.imageUrl} alt="ActiveSlide" />
      <div className="container">
        <div className="carousel-caption">
          <h3 className="h1">{carouselItem.title}</h3>
          <div>
            <a className="btn" href="#" role="button">
              View all DEALS
              <img src="assets/icons/icon-angle-white.svg" className="ml-3" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlides;
