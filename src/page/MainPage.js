import React, { useContext } from 'react';

import MainEmptyLayout from '@/components/ui/Layout/MainEmptyLayout';
import DBProductsContext from '@/db/products';
import ProductList from '@/components/catalogOfProducts/ProductList';

const MainPage = () => {
  const productsData = useContext(DBProductsContext);

  return (
    <MainEmptyLayout>
      <ProductList productsData={productsData} />
    </MainEmptyLayout>
  );
};

export default MainPage;
