import React, { useContext, useState } from 'react';
import DBCart, { DBCartContext } from '@/db/DBCart';

const useCheckoutProductList = ({ products }) => {
  const [page, setPage] = useState(0);
  const { pageSize } = useContext(DBCartContext);

  const getProductsByPage = () => {
    const from = page * pageSize;
    const to = (page + 1) * pageSize;
    return products.slice(from, to);
  };

  const goToPage = (event) => {
    event.preventDefault();
    const { page } = event.target.dataset;
    setPage(+page);
  };

  return {
    getProductsByPage,
    goToPage,
    page,
  };
};

export default useCheckoutProductList;
