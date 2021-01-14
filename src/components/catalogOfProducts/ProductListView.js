import React, { useContext, useCallback } from 'react';
import Price from '@/components/ui/Price/Price';
import { DBCartContext } from '@/db/DBCart';
import { DATA_SOURCE_PRODUCT } from '@/db/dataSourceConfig';
import ProductRate from '@/components/products/rate/ProductRate';
import DataSourceProvider from '@/db/DataSourceProvider/DataSourceProvider';

const ProductListView = ({ data: product }) => {
  const { addToCart } = useContext(DBCartContext);

  const handleAddProduct = useCallback(() => {
    addToCart(product.id);
  }, [product.id, addToCart]);

  return (
    <div data-product-id={product.id} className="products-list-product col-md-6 col-lg-4 mb-4">
      <div className="card">
        <div className="card-img-wrap">
          <img className="card-img-top" src={product.imageUrl} alt="Card image cap" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <ProductRate key={product.id} id={product.id} />
          <Price key={product.title} product={product} />
          <button
            className="product-add-to-cart"
            data-button-role="add-to-cart"
            onClick={handleAddProduct}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataSourceProvider(DATA_SOURCE_PRODUCT, ProductListView);
