import React from 'react';

import Product from '@/components/Product/Product';

class CheckoutProductList extends React.Component {
  constructor(props) {
    super(props);

    this.page = 0;
  }

  getSumPrice = () => {
    const sum = (a, b) => +a + +b;
    return this.props.products
      .map((value) => value['price'])
      .reduce(sum, 0)
      .toFixed(2);
  };

  getProductsByPage = () => {
    const productsInCart = this.props.products;
    const from = this.page * this.props.pageSize;
    const to = (this.page + 1) * this.props.pageSize;

    return productsInCart.slice(from, to);
  };

  getButton = () => {
    let buttons = [];
    for (let i = 0; i < Math.ceil(this.props.products.length / this.props.pageSize); i++) {
      let className = 'btn-pag ';

      if (this.page === i) {
        className += 'active';
      }

      buttons.push(<button className={className} data-page={i}>{i + 1}</button>);
    }

    return (
      <div className="buttons">
        {buttons}
      </div>
    )
  };

  render = () => {
    const products = this.getProductsByPage();

    const sumPrice = this.getSumPrice();
    const buttons = this.getButton();

    return (
      <>
        <div className="product-list-box">
          {products.map((item) => {
            return <Product item={item} />
          })};
        </div>
        <div className="order-value"> Order value: € ${sumPrice}</div>
        ${buttons}
      </>
    )
  };

  /*
  initListenersButton = () => {
    document.body.addEventListener('click', (event) => {
      const { target } = event;
      if (!event.target.matches('.btn-pag')) return;

      const { page } = target.dataset;

      this.page = +page;
      this.show();
      // const buttons = document.querySelector('.btn-pag');
      const blocks = target.closest('.active');
      // const blocks = target.closest('.btn-pag');
      blocks.classList.remove('active');
      // blocks.classList.add('active');
    });
  }


  */
}

export default CheckoutProductList;
