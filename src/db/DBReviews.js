import React, {
  useMemo, useState, useCallback,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';
import useDebounce from '@/utils/hook/useDebounce';
import { DATA_LOADED, DATA_LOADING } from '@/db/constants';

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

      await loadReviewsById(onlyNewIDs)
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

export default DBReviews;
