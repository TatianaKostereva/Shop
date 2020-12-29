import React from 'react';
import Rate from '@/components/core/Rate/Rate';
import useDataSource from '@/db/hook/useDataSource';
import { DATA_LOADED } from '@/db/constants';
import { DATA_SOURCE_REVIEW } from '@/db/DBComponent';

const ProductRate = ({ id }) => {
  const reviewsDataSource = useDataSource(DATA_SOURCE_REVIEW, id);

  if (reviewsDataSource.status !== DATA_LOADED) {
    return null;
  }

  return <Rate reviews={reviewsDataSource.data} />;
};

export default ProductRate;
