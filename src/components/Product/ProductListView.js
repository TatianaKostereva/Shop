import React, { useContext } from 'react';
import Rate from '@/components/Rate/Rate';
import Price from '@/components/Price/Price';
import DBProductsContext from '@/db/products';
import CartService from '@/services/CartService';

const ProductListView = ({ product }) => {

    return (
        <div data-product-id={product.id} key={product.id} className="products-list-product col-md-6 col-lg-4 mb-4">
            <div className="card">
                <div className="card-img-wrap">
                    <img className="card-img-top" src={product.imageUrl} alt="Card image cap"/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <Rate rating={product.rating} />
                    <Price product={product} />
                    <button
                        className="product-add-to-cart"
                        data-button-role="add-to-cart"
                        onClick={() => {
                        CartService.putProducts(product.id);
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