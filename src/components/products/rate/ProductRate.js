import React from 'react';
import Rate from '@/components/core/Rate/Rate';
import { useReviewData } from '@/db/DBReviews';
import { DATA_LOADED } from '@/db/hook/useDataSource';

const ProductRate = ({ id }) => {
  const res = useReviewData([id]);

  if (res.status !== DATA_LOADED) {
    return null;
  }
  return <Rate res={res.data} />;
};

export default ProductRate;
