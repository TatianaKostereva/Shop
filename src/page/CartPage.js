import React from 'react';

import CartService from '@/services/CartService';
import CheckoutProductList from '@/components/Card/CheckoutProductList';

class CartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartIds: CartService.getProductsId(),
    };
  }

  render = () => {
    const products = CartService.getProducts(this.state.cartIds, this.props.productsData);

    return (
      <CheckoutProductList
        products={products}
        pageSize={3}
        deleteProduct={this.deleteProduct}
      />

    )
  };

  deleteProduct = (id) => {
    if (confirm('Вы уверены, что хотите удалить этот товар из корзины?') !== true) {
      return false;
    }

    const indexOfProductToDelete = this.state.cartIds.findIndex((productId) => productId == id);
    const newCartIds = [...this.state.cartIds];
    newCartIds.splice(indexOfProductToDelete, 1);

    this.setState({
      cartIds: newCartIds,
    });
    localStorage.setItem('cart-products', JSON.stringify(newCartIds));
  }
}

export default CartPage;
