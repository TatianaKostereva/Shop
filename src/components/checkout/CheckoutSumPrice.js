import React from 'react';
import useProductsSum from '@/components/checkout/hooks/useProductsSum';

const sum = (a, b) => +a + +b;

const CheckoutSumPrice = ({ products }) => {
  const sumPrice = useProductsSum(products);

  return (
    <div className="order-value">
      {' '}
      Order value: €
      {sumPrice}
    </div>
  );
};

export default CheckoutSumPrice;
