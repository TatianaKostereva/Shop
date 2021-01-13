import React, {
  useMemo, useState, useCallback,
} from 'react';
import { DATA_LOADED, DATA_LOADING } from '@/db/constants';
import dataSourceConfig from '@/db/dataSourceConfig';

export const DBContext = React.createContext(
  {},
);

const DBComponent = ({ children }) => {
  const [storage, setStorage] = useState({});

  const setDataInStorage = useCallback((key, data) => {
    setStorage((state) => {
      const newStorage = { ...state[key] };

      data.forEach((item) => {
        dataSourceConfig[key].storageMapper(newStorage, item);
      });

      return { ...state, [key]: newStorage };
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

      dataSourceConfig[key].loadDataByIDs(onlyNewIDs)
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
    }
  }, [storage]);

  const componentStore = useMemo(() => ({
    loadDataByIDs,
    storage,
  }), [
    loadDataByIDs,
    storage,
  ]);

  return (
    <DBContext.Provider value={componentStore}>
      {children}
    </DBContext.Provider>
  );
};

export default DBComponent;
