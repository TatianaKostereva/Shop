import React, {
  useMemo, useState, useCallback,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';

export const DBReviewsContext = React.createContext(
  [],
);

let debouncePromise = null;
let debounceIds = [];

const DBReviews = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [storage, setStorage] = useState({});

  const loadDataByIDs = useCallback((ids) => {
    debounceIds = [...debounceIds, ids];
    if (!debouncePromise) {
      debouncePromise = new Promise((resolve) => {
        setTimeout(resolve, 100);
      }).then(() => {
        loadReviewsById(debounceIds)
          .then((data) => {
            const newStorage = {};
            data.forEach((item) => {
              newStorage[item.id] = item;
            });

            setStorage((state) => ({ ...state, ...newStorage }));
            setLoaded(true);
          });

        debouncePromise = null;
        debounceIds = [];
      });
    }

    return debouncePromise;
  }, []);

  const reviewsStore = useMemo(() => ({
    loadDataByIDs,
    loaded,
    storage,
  }), [
    loadDataByIDs,
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
