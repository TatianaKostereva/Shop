import React from 'react';
import ProductListView from '@/components/catalogOfProducts/ProductListView';

const ProductList = ({ productsData }) => (
  <div className="row justify-content-end">
    <div className="col-lg-9">
      <h3 className="section-title">Top Recommendations for You</h3>
      <div className="row homepage-cards">
        {productsData.map((item) => <ProductListView key={item.id} product={item} />)}
      </div>
    </div>
  </div>
);

export default ProductList;
