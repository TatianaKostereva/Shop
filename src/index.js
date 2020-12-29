import React from 'react';
import ReactDOM from 'react-dom';
import CartPage from '@/page/CartPage';
import DBCart from '@/db/DBCart';
import MainPage from '@/page/MainPage';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DBCurrency from '@/db/DBCurrency';
import DBReviews from '@/db/DBReviews';
import DBComponent from '@/db/DBComponent';

ReactDOM.render(
  (
    <Router>
      <DBComponent>
        <DBReviews>
          <DBCurrency>
            <DBCart>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/cart" component={CartPage} />
              </Switch>
            </DBCart>
          </DBCurrency>
        </DBReviews>
      </DBComponent>
    </Router>
  ),
  document.querySelector('#root'),
);
