import React, {
  useMemo, useState, useCallback, useEffect, useContext,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';
import useDebounce from '@/utils/hook/useDebounce';
import { DATA_EMPTY, DATA_LOADED } from '@/db/hook/useDataSource';

export const DBReviewsContext = React.createContext(
  [],
);

const DBReviews = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [storage, setStorage] = useState({});

  const setDataInStorage = useCallback((data) => {
    setStorage((state) => {
      const newStorage = { ...state };

      data.forEach((item) => {
        newStorage[item.product_id].data.push(item);
      });

      return newStorage;
    });
  }, []);

  const loadDataByIDs = useCallback((ids) => {
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
          status: DATA_EMPTY,
        };
      });
      setStorage((state) => ({ ...state, ...newStorage }));

      loadReviewsById(onlyNewIDs)
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

  const loadDataByIDsDebounced = useDebounce(loadDataByIDs);

  const reviewsStore = useMemo(() => ({
    loadDataByIDs: loadDataByIDsDebounced,
    loaded,
    storage,
  }), [
    loadDataByIDsDebounced,
    loaded,
    storage,
  ]);

  return (
    <DBReviewsContext.Provider value={reviewsStore}>
      {children}
    </DBReviewsContext.Provider>
  );
};

export const useReviewData = (id) => {
  const { storage, loadDataByIDs } = useContext(DBReviewsContext);
  const [storageForIDs, setStorageForIDs] = useState({});

  useEffect(() => {
    const newStorage = { ...storageForIDs };
    if (!newStorage[id]) {
      newStorage[id] = id;
    }
    setStorageForIDs(newStorage);
    loadDataByIDs(Object.values(newStorage));
  }, []);

  return storage[id] || {
    data: [],
    status: DATA_EMPTY,
  };
};

export default DBReviews;
