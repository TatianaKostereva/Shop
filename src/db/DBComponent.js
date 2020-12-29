import React, {
  useMemo, useState, useCallback,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';
import { DATA_LOADED, DATA_LOADING } from '@/db/constants';

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
  },
  [DATA_SOURCE_REVIEW]: {
    storageMapper: storageMapperByProductID,
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
      });

      return { ...state, key: newStorage };
    });
  }, []);

  const loadDataByIDs = useCallback((key, ids) => {
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
      setStorage((state) => ({ ...state, [key]: { ...state[key], ...newStorage } }));

      loadReviewsById(onlyNewIDs)
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

