import React, { useEffect, useState } from 'react';
import MainEmptyLayout from '@/components/ui/Layout/MainEmptyLayout';
import ProductList from '@/components/catalogOfProducts/ProductList';
import getProductsForMain from '@/services/getProductsForMain';

const MainPage = () => {
  const [idsList, setIdsList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getProductsForMain()
      .then((data) => {
        setIdsList([...idsList, ...data]);
        setLoaded(true);
      });
  }, []);

  const ids = idsList.reduce((acc, item) => {
    acc = acc.concat(Object.values(item));
    return acc;
  }, []);

  return (
    <MainEmptyLayout>
      <ProductList ids={ids} />
    </MainEmptyLayout>
  );
};

export default MainPage;
