import React, {
  useMemo, useState, useCallback,
} from 'react';
import loadProduct, { loadProductByIds } from '@/services/loadProduct';
import loadReviews, { loadReviewsById } from '@/services/loadReviews';

export const DBProductsContext = React.createContext(
  [],
);

const DBProducts = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState([]);
  const [storage, setStorage] = useState({});
  const [productsList, setProductsList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);

  const loadData = useCallback((start, end) => {
    setLoaded(false);
    loadReviews(start, end).then((res) => setReviews([...reviews, ...res]));
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
    loadReviewsById(ids).then(setReviews);
    return loadProductByIds(ids)
      .then((data) => {
        setProductsInCart(data);
        setLoaded(true);
      });
  }, [productsInCart]);

  const productsStore = useMemo(() => ({
    productsList,
    loadDataByID,
    loaded,
    loadData,
    productsInCart,
    reviews,
  }), [
    productsList,
    loadDataByID,
    loaded,
    loadData,
    productsInCart,
    reviews,
  ]);

  return (
    <DBProductsContext.Provider value={productsStore}>
      {children}
    </DBProductsContext.Provider>
  );
};

export default DBProducts;
