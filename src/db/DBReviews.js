import React, {
  useMemo, useState, useCallback,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';

export const DBReviewsContext = React.createContext(
  [],
);

const DBReviews = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [storage, setStorage] = useState({});

  const loadDataByIDs = useCallback((ids) => {
    setLoaded(false);
    return loadReviewsById(ids)
      .then((data) => {
        const newStorage = { ...storage };
        data.forEach((item) => {
          newStorage[item.id] = item;
        });

        setStorage((state) => ({ ...state, ...newStorage }));
        setLoaded(true);
      });
  }, [storage]);

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
