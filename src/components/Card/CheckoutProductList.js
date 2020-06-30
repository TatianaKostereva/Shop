import React from 'react';

import Product from '@/components/Product/Product';
import CheckoutSumPrice from '@/components/CheckoutSumPrice/CheckoutSumPrice';

class CheckoutProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };
  }

  getProductsByPage = () => {
    const productsInCart = this.props.products;
    const from = this.state.page * this.props.pageSize;
    const to = (this.state.page + 1) * this.props.pageSize;

    return productsInCart.slice(from, to);
  };

  getButton = () => {
    let buttons = [];
    for (let i = 0; i < Math.ceil(this.props.products.length / this.props.pageSize); i++) {
      let className = 'btn-pag ';

      if (this.state.page === i) {
        className += 'active';
      }

      buttons.push(<button onClick={this.goToPage} className={className} data-page={i}>{i + 1}</button>);
    }

    return (
      <div className="buttons">
        {buttons}
      </div>
    )
  };

  render = () => {
    const products = this.getProductsByPage();
    const buttons = this.getButton();

    return (
      <div>
        <div className="product-list-box">
          {products.map((item) => {
            return <Product id={item.id} />
          })}
        </div>
        <CheckoutSumPrice products={products} />
        {buttons}
      </div>
    )
  };

  goToPage = (event) => {
    event.preventDefault();
    const { page } = event.target.dataset;

    this.setState({page: +page});
  }
}

export default CheckoutProductList;
