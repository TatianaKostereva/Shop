import React, { useContext, useEffect, useState } from 'react';
import Rate from '@/components/core/Rate/Rate';
import Price from '@/components/ui/Price/Price';
import { DBCartContext } from '@/db/DBCart';
import loadReviews from '@/services/loadReviews';

const ProductListView = ({ product }) => {
  const { addToCart } = useContext(DBCartContext);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    loadReviews(product.id).then((reviews) => setReviews(reviews));
  }, []);

  return (
    <div data-product-id={product.id} key={product.id} className="products-list-product col-md-6 col-lg-4 mb-4">
      <div className="card">
        <div className="card-img-wrap">
          <img className="card-img-top" src={product.imageUrl} alt="Card image cap" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          {reviews && <Rate reviews={reviews} />}
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
