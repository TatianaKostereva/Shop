import React from 'react';

const Rate = ({ reviews = [] }) => {
  const stars = reviews.reduce((a, b) => a + b.stars, 0) / reviews.length;

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
      <span className="rate-amount ml-2">{reviews}</span>
    </div>
  );
};

export default Rate;
