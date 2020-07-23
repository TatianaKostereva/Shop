import React from 'react';

const Price = ({ product = { product } }) => {
  const oldPriceLabel = product.oldPrice ? (
    <small className="ml-2">
      {product.oldPrice}
    </small>
  ) : '';
  return (
    <p className="card-text price-text discount">
      <strong>
        € {product.price}
      </strong>
      {oldPriceLabel}
    </p>
  );
};

export default Price;
