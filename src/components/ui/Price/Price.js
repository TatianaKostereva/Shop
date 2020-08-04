import React, {useEffect, useState} from 'react';
import useMainHeader from '@/components/ui/Header/MainHeader/hooks/useMainHeader';

const Price = ({ product }) => {
  const { currency } = useMainHeader();

  const [current, setCurrent] = useState({});

  useEffect(() => {
    setCurrent(currency);
  }, [currency]);

  const oldPriceLabel = product.oldPrice ? (
    <small className="ml-2">
      {product.oldPrice}
    </small>
  ) : '';

  return (
    <p className="card-text price-text discount">
      <strong>
        {current.currencyIcon}
        {' '}
        {product.price}
      </strong>
      {oldPriceLabel}
    </p>
  );
};

export default Price;
