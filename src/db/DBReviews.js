import React, {
  useMemo, useState, useCallback,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';

export const DBReviewsContext = React.createContext(
  [],
);

const debounce = (func) => {
  let debouncePromise = null;
  let debounceIds = [];

  return (ids) => {
    debounceIds = [...debounceIds, ids];
    if (!debouncePromise) {
      debouncePromise = new Promise((resolve) => {
        setTimeout(resolve, 100);
      }).then(() => {
        func(debounceIds);
        debouncePromise = null;
        debounceIds = [];
      });
    }

    return debouncePromise;
  };
};

const DBReviews = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [storage, setStorage] = useState({});

  const loadDataByIDs = useCallback((ids) => {
    loadReviewsById(ids)
      .then((data) => {
        const newStorage = {};
        data.forEach((item) => {
          newStorage[item.id] = item;
        });

        setStorage((state) => ({ ...state, ...newStorage }));
        setLoaded(true);
      });
  },
  []);

  const loadDataByIDsDebounced = useCallback(debounce(loadDataByIDs), [loadDataByIDs]);

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
