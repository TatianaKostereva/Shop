import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import loadCurrencies, { loadCurrentCurrency } from '@/services/loadCurrencies';

export const DBCurrencyContext = React.createContext(
  [],
);

export const useCurrency = (currentCurrency) => {
  const currencies = useContext(DBCurrencyContext).list;

  if (!currencies) {
    return null;
  }

  const receivedCurrency = currencies[currentCurrency];
  return receivedCurrency;
};

const DBCurrency = ({ children }) => {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState(5);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadCurrencies(1, 4)
      .then((currencies) => {
        setList([...list, ...currencies]);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    loadCurrentCurrency(current)
      .then((currencies) => {
        setList([...list, ...currencies]);
        setCurrent(current);
      });
  }, [current, loaded]);

  const currencyStore = useMemo(() => ({
    list,
    loaded,
    current,
  }), [
    list,
    loaded,
    current,
  ]);

  return (
    <DBCurrencyContext.Provider value={currencyStore}>
      {children}
    </DBCurrencyContext.Provider>
  );
};

export default DBCurrency;
