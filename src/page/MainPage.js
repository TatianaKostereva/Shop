import React, { useEffect, useState } from 'react';
import MainEmptyLayout from '@/components/ui/Layout/MainEmptyLayout';
import ProductList from '@/components/catalogOfProducts/ProductList';
import getProductsForMain from '@/services/getProductsForMain';

const useInit = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

const MainPage = () => {
  const [idsList, setIdsList] = useState([]);

  useInit(() => {
    getProductsForMain()
      .then((data) => {
        setIdsList([...idsList, ...data]);
      });
  });


  return (
    <MainEmptyLayout>
      <ProductList ids={idsList} />
    </MainEmptyLayout>
  );
};

export default MainPage;
