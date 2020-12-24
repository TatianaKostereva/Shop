import { useContext, useEffect } from 'react';

const useDataSource = (dbContext, id) => {
  const { storage, loadDataByIDs } = useContext(dbContext);

  useEffect(() => {
    loadDataByIDs([id]);
  }, [id]);

  return {
    data: storage[id]?.data,
    status: storage[id]?.status,
  };
};

export default useDataSource;
