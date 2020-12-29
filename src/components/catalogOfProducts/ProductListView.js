import React, { useContext } from 'react';
import Price from '@/components/ui/Price/Price';
import { DBCartContext } from '@/db/DBCart';
import { DBContext, DATA_SOURCE_PRODUCT } from '@/db/DBComponent';
import ProductRate from '@/components/products/rate/ProductRate';
import { DATA_LOADED } from '@/db/constants';

const ProductListView = ({ id }) => {
  const { addToCart } = useContext(DBCartContext);
  const { storage } = useContext(DBContext);

  if (storage[DATA_SOURCE_PRODUCT]?.[id]?.status !== DATA_LOADED) {
    return false;
  }

  const product = storage[DATA_SOURCE_PRODUCT]?.[id].data;

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
            onClick={() => {
              addToCart(product.id);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
