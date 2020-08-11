import React, {
  useMemo, useState, useCallback, useEffect,
} from 'react';
import loadProduct, { loadProductsAll } from '@/services/loadProduct';

export const DBProductsContext = React.createContext(
  [],
);

const DBProducts = ({ children }) => {
  const [productsList, setProductsList] = useState([]);
  const [productsListAll, setProductsListAll] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadProductsAll()
      .then((data) => {
        setProductsListAll(data);
      });
  }, []);

  const loadData = useCallback((start, end) => {
    setLoaded(false);
    loadProduct(start, end)
      .then((data) => {
        setProductsList([...productsList, ...data]);
        setLoaded(true);
      });
  }, [productsList]);

  const productsStore = useMemo(() => ({
    productsList,
    loaded,
    loadData,
    productsListAll,
  }), [
    productsList,
    loaded,
    loadData,
    productsListAll,
  ]);

  return (
    <DBProductsContext.Provider value={productsStore}>
      {children}
    </DBProductsContext.Provider>
  );
};

export default DBProducts;
