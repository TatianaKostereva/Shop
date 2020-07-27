import React from 'react';
import getStars from '@/components/core/Rate/utils/getStars';

const Rate = ({ reviews = [] }) => {
  const stars = getStars(reviews);

  const starsRender = new Array(5).fill('').map((value, index) => {
    let modificator;
    if (reviews.length !== 0) {
      modificator = index < stars ? 'checked' : 'active';
    }
    const iconClassName = `icon-star ${modificator}`;

    return <i className={iconClassName} key={index} />;
  });

  return (
    <div className="rate">
      {starsRender}
      <span className="rate-amount ml-2">{reviews.length}</span>
    </div>
  );
};

export default Rate;
