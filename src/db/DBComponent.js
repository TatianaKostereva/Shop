import React, {
  useMemo, useState, useCallback,
} from 'react';
import { loadReviewsById } from '@/services/loadReviews';
import { DATA_EMPTY, DATA_LOADED } from '@/db/constants';

const DBComponent = ({ children }, callback, context) => {
  const [loaded, setLoaded] = useState(false);
  const [storage, setStorage] = useState({});

  const setDataInStorage = useCallback((data) => {
    setStorage((state) => {
      const newStorage = { ...state };

      data.forEach((item) => {
        callback(newStorage, item);
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
    <context.Provider value={componentStore}>
      {children}
    </context.Provider>
  );
};

export default DBComponent;

// const callback = (storage, item) => {
//   storage[item.id] = item;
//   return true;
// };
//
// const DBProducts = DBComponent({ children }, callback, DBProductsContext);
