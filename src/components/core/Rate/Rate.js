import React from 'react';
import loadReviews from '@/services/loadReviews';

 const Rate = ({ reviews = [] }) => {
   console.log(reviews)
  const stars = +reviews.reduce((prevValue, item) => prevValue + +item.stars, 0) / reviews.length;
  console.log(stars)

  let starsRender;
  if (reviews.length > 0) {
    starsRender = new Array(5).fill('').map((value, index) => {
      const modificator = index < stars ? 'checked' : 'active';
      const iconClassName = `icon-star ${modificator}`;

      return <i className={iconClassName} key={index} />;
    });
  } else {
    starsRender = <i className="icon-star" />
  }

  return (
    <div className="rate">
      {starsRender}
      <span className="rate-amount ml-2">{reviews.length}</span>
    </div>
  );
};

export default Rate;
