import React, { useContext, useEffect } from 'react';
import Rate from '@/components/core/Rate/Rate';
import { DBReviewsContext } from '@/db/DBReviews';

const ProductRate = ({ id }) => {
  const { storage, loadDataByIDs } = useContext(DBReviewsContext);
  useEffect(() => {
    loadDataByIDs([id]);
  }, [id]);

  const res = Object.values(storage).filter((item) => item.product_id === id);
  return <Rate res={res} />;
};

export default ProductRate;
