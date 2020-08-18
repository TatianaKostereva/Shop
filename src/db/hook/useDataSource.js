import { useContext, useEffect, useState } from 'react';

export const DATA_EMPTY = 'DATA_EMPTY';
export const DATA_LOADING = 'DATA_LOADING';
export const DATA_LOADED = 'DATA_LOADED';
export const DATA_ERROR = 'DATA_ERROR';

const useDataSource = (dbContext, ids) => {
  const [status, setStatus] = useState(DATA_EMPTY);
  const { productsInCart, loaded, loadDataByID } = useContext(dbContext);

  useEffect(() => {
    setStatus(DATA_LOADING);
    loadDataByID(ids).then(() => {
      setStatus(DATA_LOADED);
    }).catch(() => {
      setStatus(DATA_ERROR);
    });
  }, [ids]);

  if (!loaded) {
    return '...loading';
  }

  return {
    data: productsInCart,
    status,
  };
};

export default useDataSource;
