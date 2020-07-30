import React from 'react';
import { useCurrency } from '@/db/DBCurrency';

const Price = ({ product }) => {
  const currency = useCurrency() || {};

  console.log(currency.currencyIcon)

  const oldPriceLabel = product.oldPrice ? (
    <small className="ml-2">
      {product.oldPrice}
    </small>
  ) : '';

  return (
    <p className="card-text price-text discount">
      <strong>
        {currency.currencyIcon}
        {' '}
        {product.price}
      </strong>
      {oldPriceLabel}
    </p>
  );
};

export default Price;
