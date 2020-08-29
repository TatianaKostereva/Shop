import React, {
  useMemo, useState, useCallback, useEffect,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';
import useDebounce from '@/utils/hook/useDebounce';

export const DBReviewsContext = React.createContext(
  [],
);

const DBReviews = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [storage, setStorage] = useState({});

  const loadDataByIDs = useCallback((ids) => {
    const onlyNewIDs = [];

    for (const id of ids) {
      if (!storage[id]) {
        onlyNewIDs.push(id);
      }
    }
    console.log(onlyNewIDs);
    const shouldNewData = onlyNewIDs.length > 0;
    if (shouldNewData) {
      loadReviewsById(onlyNewIDs)
        .then((data) => {
          const newStorage = {};
          data.forEach((item) => {
            newStorage[item.id] = item;
          });

          setStorage((state) => ({ ...state, ...newStorage }));
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
