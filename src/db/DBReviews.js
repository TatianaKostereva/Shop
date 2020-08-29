import React, {
  useMemo, useState, useCallback, useEffect,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';
import useDebounce from '@/utils/hook/useDebounce';

export const DBReviewsContext = React.createContext(
  [],
);

const compareObjects = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const DBReviews = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [storage, setStorage] = useState({});
  const [storageForIDs, setStorageForIDs] = useState({});

  const loadDataByIDs = useCallback((ids) => {
    const oldStorageForIDs = { ...storageForIDs };
    const newStorageForIDs = { ...storageForIDs };

    for (const id of ids) {
      newStorageForIDs[id] = id;
    }
    if (!compareObjects(newStorageForIDs, oldStorageForIDs)) {
      setStorageForIDs(newStorageForIDs);
    }
  }, [storageForIDs]);

  useEffect(() => {
    loadReviewsById(Object.values(storageForIDs))
      .then((data) => {
        const newStorage = {};
        data.forEach((item) => {
          newStorage[item.id] = item;
        });

        setStorage((state) => ({ ...state, ...newStorage }));
        setLoaded(true);
      });
  }, [storageForIDs]);

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
