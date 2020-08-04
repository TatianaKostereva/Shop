import React from 'react';
import { Link } from 'react-router-dom';
import useMainHeader from '@/components/ui/Header/MainHeader/hooks/useMainHeader';

const MainHeader = () => {
  const { choiceCurrency } = useMainHeader();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div>
            <button
              className="navbar-toggler d-none d-md-inline-flex d-lg-none"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample07"
              aria-controls="navbarsExample07"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img src="./assets/icons/icon-menu.svg" alt="menu icon" />
            </button>
            <button
              className="navbar-toggler d-inline-flex d-md-none has-messages"
              type="button"
              data-toggle="modal"
              data-target="#xsMenuModal"
            >
              <img src="./assets/icons/icon-menu.svg" alt="menu icon" />
            </button>
            <Link className="navbar-brand" to="/"><strong>AnyShop</strong></Link>
          </div>
          <a
            href="#"
            className="mobile-search-menu-icon"
          >
            <img
              src="./assets/icons/icon-search.svg"
              alt="menu icon"
            />
          </a>

          <div className="collapse navbar-collapse" id="navbarsExample07">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link
                  className="nav-link"
                  to="/"
                >
                  Sales
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="cart">Cart</Link>
              </li>
              <li className="nav-item">
                <form className="form-inline my-2 my-md-0 ml-lg-5">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button type="submit" className="btn btn-outline-primary">
                    Search
                  </button>
                </form>
              </li>
            </ul>
          </div>
          <div className="currency">
            <button className="dropbtn">Choice your currency</button>
            <div className="dropdown-content">
              <a data-currency-to="0" onClick={choiceCurrency}>EUR</a>
              <a data-currency-to="1" onClick={choiceCurrency}>USD</a>
              <a data-currency-to="2" onClick={choiceCurrency}>RUB</a>
              <a data-currency-to="3" onClick={choiceCurrency}>GBR</a>
              <a data-currency-to="4" onClick={choiceCurrency}>INR</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
