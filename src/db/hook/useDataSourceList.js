import { useContext, useEffect } from 'react';
import { DATA_LOADING } from '@/db/constants';

const useDataSourceList = (dbContext, ids) => {
  const { storage, loadDataByIDs } = useContext(dbContext);

  useEffect(() => {
    loadDataByIDs(ids);
  }, [ids]);

  return {
    data: ids.map((id) => storage[id]?.data),
    status: ids.every((id) => storage[id]?.status === storage[ids[0]]?.status)
      ? storage[ids[0]]?.status || DATA_LOADING
      : DATA_LOADING,
  };
};

export default useDataSourceList;
