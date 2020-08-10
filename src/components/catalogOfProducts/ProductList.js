import React from 'react';
import ProductListView from '@/components/catalogOfProducts/ProductListView';
import getPages from '@/services/getPages';

const ProductList = ({ productsData }) => {
  const pageSize = 9;
  const {
    getItemsByPage,
    getButton,
  } = getPages({ items: productsData }, { pageSize });

  const productsByPage = getItemsByPage();
  const buttons = getButton();

  return (
    <div className="row justify-content-end">
      <div className="col-lg-9">
        <h3 className="section-title">Top Recommendations for You</h3>
        <div className="row homepage-cards">
          {productsByPage.map((item) => <ProductListView key={item.id} product={item} />)}
        </div>
        {buttons}
      </div>
    </div>
  );
};

export default ProductList;

//<a>Show more</a>
