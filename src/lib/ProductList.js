import React from 'react';

import ProductListView from '@/components/Product/ProductListView';


class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }


  render = () =>  {
    const products = this.props.productsData;

    return (
      <div className="row justify-content-end">
        <div className="col-lg-9">
           <h3 className="section-title">Top Recommendations for You</h3>
           <div className="row homepage-cards">
              {products.map((item) => {
                return <ProductListView product={item} />
              })}
           </div>
        </div>
      </div>
    )
  }

}

export default ProductList;
