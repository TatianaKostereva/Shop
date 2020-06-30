import React from 'react';

const sum = (a, b) => +a + +b;

const CheckoutSumPrice = ({ products }) => {
  const sumPrice = products
    .map((value) => value.price * value.sum)
    .reduce(sum, 0)
    .toFixed(2);

  return (
    <div className="order-value"> Order value: € {sumPrice}</div>
  );
};

export default CheckoutSumPrice;
