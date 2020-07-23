import React, { useContext } from 'react';
import Rate from '@/components/core/Rate/Rate';
import Price from '@/components/ui/Price/Price';
import { DBCartContext } from '@/db/DBCart';

const ProductListView = ({ product }) => {
  const { addToCart } = useContext(DBCartContext);

  fetch(`http://localhost:3000/reviews/get_by_product/${product.id}`).then((res) => res.json()).then(console.log);

  return (
    <div data-product-id={product.id} key={product.id} className="products-list-product col-md-6 col-lg-4 mb-4">
      <div className="card">
        <div className="card-img-wrap">
          <img className="card-img-top" src={product.imageUrl} alt="Card image cap" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <Rate />
          <Price product={product} />
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
