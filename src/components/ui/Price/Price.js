import React, { useContext } from 'react';
import { DBCurrencyContext } from '@/db/DBCurrency';

const Price = ({ product }) => {
  const { currency, loaded } = useContext(DBCurrencyContext);

  if (!loaded) {
    return null;
  }

  let rate;
  switch (+currency.number) {
    case 978:
      rate = 1;
      break;
    case 840:
      rate = 1.18;
      break;
    case 643:
      rate = 87.17;
      break;
  }

  const oldPriceLabel = product.oldPrice ? (
    <small className="ml-2">
      {(+product.oldPrice * rate).toFixed(2)}
    </small>
  ) : '';

  return (
    <p className="card-text price-text discount">
      <strong>
        {currency.currencyIcon}
        {' '}
        {(+product.price * rate).toFixed(2)}
      </strong>
      {oldPriceLabel}
    </p>
  );
};

export default Price;
