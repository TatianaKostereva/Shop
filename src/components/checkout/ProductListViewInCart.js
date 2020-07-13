import React, { useContext } from 'react';
import Rate from '@/components/core/Rate/Rate';
import DBProductsContext from '@/db/products';
import { DBCartContext } from '@/db/DBCart';

const ProductListViewInCart = ({ id }) => {
  const { deleteProduct } = useContext(DBCartContext);
  const product = useContext(DBProductsContext).find((product) => product.id === id);

  return (
    <div key={product.id} data-product-id={product.id} className="product-wrapper box-inner-col description-col">
      <div className="product-image-container">
        <img className="product-image" src={product.imageUrl} alt="img" />
      </div>

      <div className="product-description">
        <h4 className="col-title mb-2">
          {product.title}
        </h4>
        <Rate rating={product.rating} />
      </div>
      <div className="product-price">
        <p className="mb-0 font-weight-light">Price:</p>
        <h4 className="col-title price-text mb-2">
          {product.currency}
          {product.price}
        </h4>
      </div>
      <div className="quantity">
        <p>Quantity:</p>
        <h1>
          {product.sum}
        </h1>
      </div>
      <div className="product-remove-button-wrapper">
        <button
          type="button"
          data-button-role="checkout-remove-product"
          onClick={() => {
            deleteProduct(product.id);
          }}
          className="product-remove-button"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ProductListViewInCart;
