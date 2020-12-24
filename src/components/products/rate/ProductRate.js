import React from 'react';
import Rate from '@/components/core/Rate/Rate';
import { DBReviewsContext } from '@/db/DBReviews';
import useDataSource from '@/db/hook/useDataSource';
import { DATA_LOADED } from '@/db/constants';

const ProductRate = ({ id }) => {
  const reviewsDataSource = useDataSource(DBReviewsContext, id);

  if (reviewsDataSource.status !== DATA_LOADED) {
    return null;
  }

  return <Rate reviews={reviewsDataSource.data} />;
};

export default ProductRate;
