import React, { useEffect, useState } from 'react';
import Rate from '@/components/core/Rate/Rate';
import loadReviews from '@/services/loadReviews';

const ProductRate = ({ id }) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    loadReviews(id).then(setReviews);
  }, [id]);

  return reviews && <Rate reviews={reviews} />;
};

export default ProductRate;
