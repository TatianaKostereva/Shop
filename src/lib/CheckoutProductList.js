class CheckoutProductList {
  constructor(parentElement, products) {
    this.el = parentElement;
    this.products = products;
    this.page = 0;
  }

  init = () => {
    this.show();
    this.initListeners();
  }

  getProducts = () => {
    const productsLocalStorage = localStorage.getItem('cart-products');
    const idProductsInCart = JSON.parse(productsLocalStorage) || [];

    const listOfProducts = idProductsInCart.map((id) => {
      const result = this.products.find((product) => product.id == id);
      return result;
    });

    const productsInCart = listOfProducts.reduce((obj, item) => {
      if (!obj.hasOwnProperty(item.id)) {
        obj[item.id] = item;
        obj[item.id].sum = 0;
      }
      obj[item.id].sum++;
      return obj;
    }, {});

    return Object.values(productsInCart);
  };

  getSumPrice = () => {
    const products = this.getProducts();

    let sum = 0;
    for (const item of products) {
      sum += +item.price * item.sum;
    }

    return sum.toFixed(2);
  }

  getRate = (item) => {
    const stars = new Array(5).fill('').map((value, index) => {
      if (item.rating != null) {
        const modificator = index < item.rating.stars ? 'checked' : 'active';
        return `<i class="icon-star ${modificator}"></i>`;
      }
      return '<i class="icon-star"></i>';
    }).join('');
    const reviews = item.rating === null ? 0 : item.rating.reviewsAmount;

    return `
        <div class = "rate" >
            ${stars}
        </div>
        <p class="rate-amount d-none d-md-block mt-1">${reviews} reviews <p>
    `;
  }

  getPrice = (item) => `
    <div class="product-price">
      <p class="mb-0 font-weight-light">Price:</p>
      <h4 class="col-title price-text mb-2">${item.currency} ${item.price}</h4>
    </div>
    `

  getProductsByPage = () => {
    const productsInCart = this.getProducts();
    const from = this.page * 3;
    const to = (this.page + 1) * 3;
    return productsInCart.slice(from, to);
  }

  getButton = () => {
    const array2 = this.getProducts();
    const onPage = 3;
    let buttons = '';

    for (let i = 0; i < Math.ceil(array2.length / onPage); i++) {
      buttons += `<button class="btn-pag active" data-page=${i}>${i + 1}</button>`;
    }

    return `
    <div class="buttons">
      ${buttons}
    </div>
    `;
  }

  renderListOfProducts = () => {
    const products = this.getProductsByPage();

    return products.map((item) => {
      const rate = this.getRate(item);
      const price = this.getPrice(item);

      return `
        <div data-product-id="${item.id}" class="product-wrapper box-inner-col description-col">
          <div class="product-image-container">
            <img class="product-image" src="${item.imageUrl}" alt="img">
          </div>

          <div class="product-description">
            <h4 class="col-title mb-2">${item.title}</h4>
            ${rate}
          </div>
          ${price}
          <div class="quantity"> <p>Quantity:</p> <h1>${item.sum}</h1></div>
          <div class="product-remove-button-wrapper">
            <button type="button"
              data-button-role="checkout-remove-product"
              class="product-remove-button">
            X
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  show = () => {
    const render = this.renderListOfProducts();
    const sumPrice = this.getSumPrice();
    const buttons = this.getButton();

    const productsInCart = `
    <div class="product-list-box">
      ${render}
    </div>
    <div class="order-value"> Order value: € ${sumPrice}</div>
      ${buttons}
    `;

    this.el.innerHTML = productsInCart;
    return productsInCart;
  }

  initListeners = () => {
    document.body.addEventListener('click', (event) => {
      const { target } = event;

      if (target.getAttribute('data-button-role') !== 'checkout-remove-product') {
        return false;
      }
      if (confirm('Вы уверены, что хотите удалить этот товар из корзины?') !== true) {
        return false;
      }
      const elem = target.closest('.product-wrapper');
      const productId = elem.getAttribute('data-product-id');

      this.deleteProduct(productId);
    });
    this.initListenersButton();
  }

  initListenersButton = () => {
    document.body.addEventListener('click', (event) => {
      const { target } = event;
      if (!event.target.matches('.btn-pag')) return;

      const { page } = target.dataset;

      this.page = page;
      this.show();
      // const buttons = document.querySelector('.btn-pag');
      const blocks = target.closest('.active');
      // const blocks = target.closest('.btn-pag');
      blocks.classList.remove('active');
      // blocks.classList.add('active');
    });
  }

  deleteProduct = (productId) => {
    const productsLocalStorage = localStorage.getItem('cart-products');
    const idProductsInCart = JSON.parse(productsLocalStorage) || [];
    const indexOfProductToDelete = idProductsInCart.findIndex((id) => productId == id);

    idProductsInCart.splice(indexOfProductToDelete, 1);

    localStorage.setItem('cart-products', JSON.stringify(idProductsInCart));

    this.show();
  }
}

export default CheckoutProductList;
