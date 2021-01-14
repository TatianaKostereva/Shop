import React from 'react';
import ReactDOM from 'react-dom';
import CartPage from '@/page/CartPage';
import DBCart from '@/db/DBCart';
import MainPage from '@/page/MainPage';
import ProductPage from '@/page/ProductPage';

import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DBCurrency from '@/db/DBCurrency';
import DBComponent from '@/db/DBComponent';

ReactDOM.render(
  (
    <DBComponent>
      <DBCurrency>
        <DBCart>

          <Router>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/cart" component={CartPage} />
              <Route exact path="/product/:id" component={ProductPage} />
            </Switch>
          </Router>

        </DBCart>
      </DBCurrency>
    </DBComponent>
  ),
  document.querySelector('#root'),
);
