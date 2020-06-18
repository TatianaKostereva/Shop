import React from 'react';
import ReactDOM from 'react-dom';

import Rate from './components/Rate/Rate';
import loadProduct from '@/lib/loadProduct';

loadProduct('/assets/data/products.json').then(products => {

  ReactDOM.render(
    <div>
      <Rate rating={products[0].rating} />
      <Rate rating={products[1].rating} />
      <Rate rating={products[2].rating} />
      <Rate />
    </div>
    ,
    document.getElementById('root'),
  );
})


