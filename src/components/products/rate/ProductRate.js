import React from 'react';
import Rate from '@/components/core/Rate/Rate';
import { DBReviewsContext } from '@/db/DBReviews';
import useDataSource, { DATA_LOADED } from '@/db/hook/useDataSource';

const ProductRate = ({ id }) => {
  const res = useDataSource(DBReviewsContext, [id]);

  if (res.status !== DATA_LOADED) {
    return null;
  }

  return <Rate res={res.data[0]} />;
};

export default ProductRate;
