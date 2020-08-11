import React from 'react';
import MainEmptyLayout from '@/components/ui/Layout/MainEmptyLayout';
import ProductList from '@/components/catalogOfProducts/ProductList';

const MainPage = () => (
  <MainEmptyLayout>
    <ProductList />
  </MainEmptyLayout>
);

export default MainPage;

