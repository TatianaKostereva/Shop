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
  const [storageForIDs, setStorageForIDs] = useState({});

  const loadDataByIDs = useCallback((ids) => {
    console.log(ids);
    const newStorageForIDs = { ...storageForIDs };
    const clone = { ...newStorageForIDs };
    console.log(clone);
    for (const item of ids) {
      newStorageForIDs[item] = item;
    }
    const strClone = JSON.stringify(clone);
    const strNewStorageForIDs = JSON.stringify(newStorageForIDs);
    console.log(newStorageForIDs);
    if (strClone !== strNewStorageForIDs) {
      setStorageForIDs(newStorageForIDs);
    }
  }, [storageForIDs]);

  useMemo(() => {
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
