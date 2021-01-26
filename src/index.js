import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import CartPage from '@/page/CartPage';
import DBCart from '@/db/DBCart';
import MainPage from '@/page/MainPage';
import ProductPage from '@/page/ProductPage';
import NewsPage from '@/page/NewsPage';

import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DBCurrency from '@/db/DBCurrency';
import DBComponent from '@/db/DBComponent';

const bigTheme = createMuiTheme({
  fontSizes: {
    mainTitle: '20px',
  },
});

const smallTheme = createMuiTheme({
  fontSizes: {
    mainTitle: '10px',
  },
});

ReactDOM.render(
  (
    <ThemeProvider theme={smallTheme}>
      <DBComponent>
        <DBCurrency>
          <DBCart>
            <Router>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/cart" component={CartPage} />
                <Route exact path="/product/:id" component={ProductPage} />
                <Route exact path="/news" component={NewsPage} />
              </Switch>
            </Router>
          </DBCart>
        </DBCurrency>
      </DBComponent>
    </ThemeProvider>
  ),
  document.querySelector('#root'),
);
