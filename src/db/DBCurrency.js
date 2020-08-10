import React, {
  useEffect, useMemo, useState,
} from 'react';
import loadCurrencies from '@/services/loadCurrencies';

export const DBCurrencyContext = React.createContext(
  [],
);

const DBCurrency = ({ children }) => {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState(978);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadCurrencies(0, 10)
      .then((currencies) => {
        setList([...list, ...currencies]);
        setLoaded(true);
      });
  }, []);

  const currency = useMemo(() => list.find((item) => item.number === current), [current, list]);

  const currencyStore = useMemo(() => ({
    list,
    loaded,
    currency,
    setCurrent,
  }), [
    list,
    loaded,
    currency,
    setCurrent,
  ]);

  return (
    <DBCurrencyContext.Provider value={currencyStore}>
      {children}
    </DBCurrencyContext.Provider>
  );
};

export default DBCurrency;
