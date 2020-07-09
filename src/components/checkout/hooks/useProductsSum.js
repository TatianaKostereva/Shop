import React, { useMemo } from 'react';
import { getProductsSum } from '@/utils/productUtils';

const useProductsSum = (products) => {
  const sumPrice = useMemo(() => getProductsSum(products), [products]);

  return sumPrice;
};

export default useProductsSum;
