import React from 'react'

const MainHeader = () => {
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
                    <img src="./assets/icons/icon-menu.svg" alt="menu icon"/>
                </button>
                <button
                    className="navbar-toggler d-inline-flex d-md-none has-messages"
                    type="button"
                    data-toggle="modal"
                    data-target="#xsMenuModal"
                >
                    <img src="./assets/icons/icon-menu.svg" alt="menu icon"/>
                </button>
                <a className="navbar-brand" href="/"><strong>AnyShop</strong></a>
            </div>
            <a href="#" className="mobile-search-menu-icon"
            ><img src="./assets/icons/icon-search.svg" alt="menu icon"
            /></a>

            <div className="collapse navbar-collapse" id="navbarsExample07">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                         <a className="nav-link" href="#"
                         >Sales <span className="sr-only">(current)</span></a
                         >
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/checkout.html">Cart</a>
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
         </div>
        </nav>
      </header>
    )
};

export default MainHeader;