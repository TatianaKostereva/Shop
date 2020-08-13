import React, { useContext } from 'react';
import { DBProductsContext } from '@/db/DBProducts';
import { DBCartContext } from '@/db/DBCart';
import ProductRate from '@/components/products/rate/ProductRate';
import Price from '@/components/ui/Price/Price';

const ProductListViewInCart = ({ id }) => {
  const { deleteProduct } = useContext(DBCartContext);
  const { productsInCart } = useContext(DBProductsContext);
  const product = productsInCart.find((product) => product.id == id);

  return (
    <div data-product-id={product.id} className="product-wrapper box-inner-col description-col">
      <div className="product-image-container">
        <img className="product-image" src={product.imageUrl} alt="img" />
      </div>
      <div className="product-description">
        <h4 className="col-title mb-2">
          {product.title}
        </h4>
        <ProductRate id={product.id} />
      </div>
      <div className="product-price">
        <p className="mb-0 font-weight-light">Price:</p>
        <h4 className="col-title price-text mb-2">
          <Price product={product} />
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
