import React from 'react';
import Rate from '@/components/Rate/Rate';
import CartService from '@/services/CartService';

const Product = ({ item }) => {

  return (
    <div key={item.id} data-product-id={item.id} className="product-wrapper box-inner-col description-col">
      <div className="product-image-container">
        <img className="product-image" src={item.imageUrl} alt="img" />
      </div>

      <div className="product-description">
        <h4 className="col-title mb-2">
          {item.title}
        </h4>
        <Rate rating={item.rating} />
      </div>
      <div className="product-price">
        <p className="mb-0 font-weight-light">Price:</p>
        <h4 className="col-title price-text mb-2">{item.currency} {item.price}</h4>
      </div>
      <div className="quantity">
        <p>Quantity:</p>
        <h1>
          {item.sum}
        </h1>
      </div>
      <div className="product-remove-button-wrapper">
        <button
          type="button"
          data-button-role="checkout-remove-product"
          onClick={() => {
            if (confirm('Вы уверены, что хотите удалить этот товар из корзины?') !== true) {
              return false;
            }
            CartService.deleteProduct(item.id);
          }}
          className="product-remove-button"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Product;
