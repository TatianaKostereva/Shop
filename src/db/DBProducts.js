import React, {
  useMemo, useState, useCallback,
} from 'react';
import loadProduct, { loadProductByIds } from '@/services/loadProduct';

export const DBProductsContext = React.createContext(
  [],
);

const DBProducts = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState([]);
  const [storage, setStorage] = useState({});
  const [productsList, setProductsList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadData = useCallback((start, end) => {
    setLoaded(false);
    loadProduct(start, end)
      .then((data) => {
        const newStorage = { ...storage };
        data.forEach((item) => {
          newStorage[item.id] = item;
        });

        setStorage(newStorage);
        setProductsList(Object.values(newStorage));
        setLoaded(true);
      });
  }, [storage]);

  const loadDataByID = useCallback((ids) => {
    setLoaded(false);
    return loadProductByIds(ids)
      .then((data) => {
        setProductsInCart(data);
        setProductsList(data);
        setLoaded(true);
      });
  }, []);

  const productsStore = useMemo(() => ({
    productsList,
    loadDataByID,
    loaded,
    loadData,
    productsInCart,
  }), [
    productsList,
    loadDataByID,
    loaded,
    loadData,
    productsInCart,
  ]);

  return (
    <DBProductsContext.Provider value={productsStore}>
      {children}
    </DBProductsContext.Provider>
  );
};

export default DBProducts;
