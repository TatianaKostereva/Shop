import React, { useEffect, useState } from 'react';
import loadCurrency from '@/services/loadCurrency';

const Price = ({ product = { product } }) => {
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    loadCurrency().then((currency) => setCurrency(currency));
  }, []);

  const oldPriceLabel = product.oldPrice ? (
    <small className="ml-2">
      {product.oldPrice}
    </small>
  ) : '';

  return (
    <p className="card-text price-text discount">
      <strong>
        {currency}
        {' '}
        {product.price}
      </strong>
      {oldPriceLabel}
    </p>
  );
};

export default Price;
