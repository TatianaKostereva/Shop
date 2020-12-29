import { useContext, useEffect } from 'react';
import { DATA_LOADING } from '@/db/constants';
import { DBContext } from '@/db/DBComponent';

const useDataSourceList = (key, ids) => {
  const { storage, loadDataByIDs } = useContext(DBContext);

  useEffect(() => {
    loadDataByIDs(key, ids);
  }, [key, ids]);

  return {
    data: ids.map((id) => storage[key]?.[id]?.data),
    status: ids.every((id) => storage[key]?.[id]?.status === storage[key]?.[ids[0]]?.status)
      ? storage[key]?.[ids[0]]?.status || DATA_LOADING
      : DATA_LOADING,
  };
};

export default useDataSourceList;
