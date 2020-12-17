import { useContext, useEffect, useState } from 'react';

export const DATA_EMPTY = 'DATA_EMPTY';
export const DATA_LOADING = 'DATA_LOADING';
export const DATA_LOADED = 'DATA_LOADED';
export const DATA_ERROR = 'DATA_ERROR';

const useDataSource = (dbContext, ids) => {
  const [status, setStatus] = useState(DATA_EMPTY);
  const { storage, loaded, loadDataByIDs } = useContext(dbContext);
  const [storageForIDs, setStorageForIDs] = useState({});

  useEffect(() => {
    const newStorage = { ...storageForIDs };
    ids.forEach((id) => {
      if (!newStorage[id]) {
        newStorage[id] = id;
      }
    });

    setStatus(DATA_LOADING);
    setStorageForIDs(newStorage);
    loadDataByIDs(Object.values(newStorage)).then(() => {
      setStatus(DATA_LOADED);
    }).catch(() => {
      setStatus(DATA_ERROR);
    });
  }, []);

  if (!loaded) {
    return '...loading';
  }

  for (let id of Object.values(storageForIDs)) {
    if (storage[id] === undefined) {
      return {
        data: [],
        status: DATA_EMPTY,
      };
    }
  }

  return {
    data: Object.values(storageForIDs).map((id) => storage[id]),
    status,
  };
};

export default useDataSource;
