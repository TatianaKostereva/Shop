import { useState } from 'react';
import { useCurrency } from '@/db/DBCurrency';

const useMainHeader = () => {
  const [currentCurrency, setCurrentCurrency] = useState(0);

  const choiceCurrency = (event) => {
    const { target } = event;
    const currentCurrency = +target.dataset.currencyTo;
    setCurrentCurrency(currentCurrency);
  };

  const currency = useCurrency(currentCurrency) || {};

  return {
    currency,
    choiceCurrency,
  };
};

export default useMainHeader;
