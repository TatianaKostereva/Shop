import React from 'react';

const Rate = ({rating = {}}) => {
  const stars = new Array(5).fill('').map((value, index) => {
    if (rating != null) {
      const modificator = index < rating.stars ? 'checked' : 'active';
      const iconClassName = `icon-star ${modificator}`;

      return <i className={iconClassName} />;
    }
    return <i className="icon-star" />;
  });

  const reviews = rating === null ? 0 : rating.reviewsAmount;

  return (
    <div className="rate">
      {stars}
      <span className="rate-amount ml-2">{reviews}</span>
    </div>
  );
};

export default Rate;
