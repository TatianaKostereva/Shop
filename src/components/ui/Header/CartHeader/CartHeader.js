import React from 'react';
import { Link } from 'react-router-dom';

const CartHeader = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/"><strong>AnyShop</strong></Link>
      </div>
    </nav>
  </header>
);

export default CartHeader;
