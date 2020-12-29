import { useContext, useEffect } from 'react';
import { DBContext } from '@/db/DBComponent';

const useDataSource = (key, id) => {
  const { storage, loadDataByIDs } = useContext(DBContext);

  useEffect(() => {
    loadDataByIDs(key, [id]);
  }, [key, id]);

  return {
    data: storage[key]?.[id]?.data,
    status: storage[key]?.[id]?.status,
  };
};

export default useDataSource;
