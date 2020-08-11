import React from 'react';
import ReactDOM from 'react-dom';
import CartPage from '@/page/CartPage';
import DBProducts from '@/db/DBProducts';
import DBCart from '@/db/DBCart';
import MainPage from '@/page/MainPage';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DBCurrency from '@/db/DBCurrency';

ReactDOM.render(
  (
    <Router>
      <DBProducts>
        <DBCurrency>
          <DBCart>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/cart" component={CartPage} />
            </Switch>
          </DBCart>
        </DBCurrency>
      </DBProducts>
    </Router>
  ),
  document.querySelector('#root'),
);
