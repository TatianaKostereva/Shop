import React from 'react';
import getStars from '@/components/core/Rate/utils/getStars';

const Rate = ({ res }) => {
  const stars = getStars(res);

  const starsRender = new Array(5).fill('').map((value, index) => {
    let modificator;

    if (res.data.length !== 0) {
      modificator = index < stars ? 'checked' : 'active';
    }
    const iconClassName = `icon-star ${modificator}`;

    return <i className={iconClassName} key={index} />;
  });

  return (
    <div className="rate">
      {starsRender}
      <span className="rate-amount ml-2">{res.data.length}</span>
    </div>
  );
};

export default Rate;
