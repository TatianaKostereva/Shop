import React, { useContext } from 'react';

import MainEmptyLayout from '@/components/ui/Layout/MainEmptyLayout';
import DBProductsContext from '@/db/products';
import ProductList from '@/components/catalogOfProducts/ProductList';

const MainPage = () => {
  const products = useContext(DBProductsContext);

  return (
    <MainEmptyLayout>
      <ProductList products={products} />
    </MainEmptyLayout>
  );
};

export default MainPage;
