import React, { useContext } from 'react';
import Rate from '@/components/core/Rate/Rate';
import { DBProductsContext } from '@/db/DBProducts';

const ProductRate = ({ id }) => {
  const { reviews } = useContext(DBProductsContext);

  return reviews && <Rate reviews={reviews} id={id} />;
};

export default ProductRate;
