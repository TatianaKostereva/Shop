import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import loadCurrencies, { loadCurrentCurrency } from '@/services/loadCurrencies';

export const DBCurrencyContext = React.createContext(
  [],
);

const currency = 0;

export const useCurrency = () => {
  const currencies = useContext(DBCurrencyContext).list;

  if (!currencies) {
    return null;
  }
  return currencies[currency];
};

const DBCurrency = ({ children }) => {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState(currency + 1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadCurrencies()
      .then((currencies) => {
        setList(currencies);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (setLoaded(false)) {
      loadCurrentCurrency(current)
        .then((currencies) => {
          setList(...list, currencies);
          setLoaded(true);
          setCurrent(current);
        });
    }
  }, [current]);

  console.log(list)

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
