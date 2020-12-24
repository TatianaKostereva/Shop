import React, {
  useMemo, useState, useCallback,
} from 'react';
import { loadProductByIds } from '@/services/loadProduct';
import { DATA_LOADING, DATA_LOADED } from '@/db/constants';

export const DBProductsContext = React.createContext(
  [],
);

const DBProducts = ({ children }) => {
  const [storage, setStorage] = useState({});
  const [loaded, setLoaded] = useState(false);

  const setDataInStorage = useCallback((data) => {
    setStorage((state) => {
      const newStorage = { ...state };

      data.forEach((item) => {
        newStorage[item.id] = {
          data: item,
        };
      });

      return newStorage;
    });
  }, []);

  const loadDataByIDs = useCallback(async (ids) => {
    const onlyNewIDs = [];

    for (const id of ids) {
      if (!storage[id]) {
        onlyNewIDs.push(id);
      }
    }

    const shouldNewData = onlyNewIDs.length > 0;
    if (shouldNewData) {
      const newStorage = {};
      onlyNewIDs.forEach((id) => {
        newStorage[id] = {
          data: [],
          status: DATA_LOADING,
        };
      });
      setStorage((state) => ({ ...state, ...newStorage }));

      setLoaded(false);
      await loadProductByIds(onlyNewIDs)
        .then(setDataInStorage)
        .then(() => {
          setStorage((state) => {
            const newStorageLoaded = { ...state };
            for (const id of ids) {
              newStorageLoaded[id].status = DATA_LOADED;
            }

            return { ...newStorageLoaded };
          });
          setLoaded(true);
        });
    }
  }, [storage]);

  const productsStore = useMemo(() => ({
    storage,
    loadDataByIDs,
    loaded,
  }), [
    storage,
    loadDataByIDs,
    loaded,
  ]);

  return (
    <DBProductsContext.Provider value={productsStore}>
      {children}
    </DBProductsContext.Provider>
  );
};

export default DBProducts;
