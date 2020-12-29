import React, {
  useMemo, useState, useCallback,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';
import { DATA_LOADED, DATA_LOADING } from '@/db/constants';
import {loadProductByIds} from "@/services/loadProduct";

export const DBContext = React.createContext(
  {},
);

export const DATA_SOURCE_PRODUCT = 'DATA_SOURCE_PRODUCT';
export const DATA_SOURCE_REVIEW = 'DATA_SOURCE_REVIEW';

const storageMapperByID = (storage, item) => {
  storage[item.id] = {
    data: item,
  };
  return true;
};

const storageMapperByProductID = (storage, item) => {
  storage[item.product_id].data.push(item);
  return true;
};

const config = {
  [DATA_SOURCE_PRODUCT]: {
    storageMapper: storageMapperByID,
    loadDataByIDs: loadProductByIds,
  },
  [DATA_SOURCE_REVIEW]: {
    storageMapper: storageMapperByProductID,
    loadDataByIDs: loadReviewsById,
  },
};

const DBComponent = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [storage, setStorage] = useState({});

  const setDataInStorage = useCallback((key, data) => {
    setStorage((state) => {
      const newStorage = { ...state[key] };

      data.forEach((item) => {
        config[key].storageMapper(newStorage, item);

        if (key === DATA_SOURCE_PRODUCT) {
          console.log(newStorage)
        }

      });

      return { ...state, [key]: newStorage };
    });
  }, []);

  const loadDataByIDs = useCallback((key, ids) => {
    const onlyNewIDs = [];

    for (const id of ids) {
      if (!storage[id]) {
        onlyNewIDs.push(id);
      }
    }

    console.log(storage, 1)

    const shouldNewData = onlyNewIDs.length > 0;
    if (shouldNewData) {
      const newStorage = {};
      onlyNewIDs.forEach((id) => {
        newStorage[id] = {
          data: [],
          status: DATA_LOADING,
        };
      });
      setStorage((state) => ({ ...state, [key]: { ...state[key], ...newStorage } }));

      config[key].loadDataByIDs(onlyNewIDs)
        .then((data) => setDataInStorage(key, data))
        .then(() => {
          setStorage((state) => {
            const newStorageLoaded = { ...state[key] };

            for (const id of ids) {
              newStorageLoaded[id].status = DATA_LOADED;
            }

            return { ...state, [key]: newStorageLoaded };
          });
        });

      setLoaded(true);
    }
  }, [storage]);


  const componentStore = useMemo(() => ({
    loadDataByIDs,
    loaded,
    storage,
  }), [
    loadDataByIDs,
    loaded,
    storage,
  ]);

  return (
    <DBContext.Provider value={componentStore}>
      {children}
    </DBContext.Provider>
  );
};

export default DBComponent;

