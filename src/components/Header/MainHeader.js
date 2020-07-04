import React from 'react'

const MainHeader = () => {
    return (
      <header>
        <nav class="navbar navbar-expand-lg navbar-light">
         <div class="container">
            <div>
                <button
                    class="navbar-toggler d-none d-md-inline-flex d-lg-none"
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
                    class="navbar-toggler d-inline-flex d-md-none has-messages"
                    type="button"
                    data-toggle="modal"
                    data-target="#xsMenuModal"
                >
                    <img src="./assets/icons/icon-menu.svg" alt="menu icon"/>
                </button>
                <a class="navbar-brand" href="/"><strong>AnyShop</strong></a>
            </div>
            <a href="#" class="mobile-search-menu-icon"
            ><img src="./assets/icons/icon-search.svg" alt="menu icon"
            /></a>

            <div class="collapse navbar-collapse" id="navbarsExample07">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                         <a class="nav-link" href="#"
                         >Sales <span class="sr-only">(current)</span></a
                         >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/checkout.html">Cart</a>
                    </li>
                    <li class="nav-item">
                        <form class="form-inline my-2 my-md-0 ml-lg-5">
                            <input
                                class="form-control mr-sm-2"
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button type="submit" class="btn btn-outline-primary">
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
