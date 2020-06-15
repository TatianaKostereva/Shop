class CheckoutProductList {
  constructor(parentElement, products) {
    this.el = parentElement;
    this.products = products;
    this.getProducts();
    this.show().then(() => {
      this.initListeners();
    });
  }

  getProducts = () => {
    const productsLocalStorage = localStorage.getItem('cart-products');
    const idProductsInCart = JSON.parse(productsLocalStorage) || [];

    const productsInCart = idProductsInCart.map((id) => {
      const result = this.products.find((product) => product.id == id);
      return result;
    });
    return productsInCart;
  };

  getSumPrice = async () => {
    const products = await this.getProducts();
    const arr = products.map((item) => item.price);

    let sum = 0;
    for (const item of arr) {
      sum += +item;
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

  getArray = async () => {
    const arrayOfProductsInCart = await this.getProducts();

    const map = arrayOfProductsInCart.reduce((obj, item) => {
      if (!obj.hasOwnProperty(item.id)) {
        obj[item.id] = item;
        obj[item.id].sum = 0;
      }
      obj[item.id].sum++;
      return obj;
    }, {});

    const resultArray = [];
    for (const obj in map) {
      resultArray.push(map[obj]);
    }

    return resultArray;
  }

  render = async () => {
    const array = await this.getArray();

    const products = array.map((item) => {
      const rate = this.getRate(item);
      const price = this.getPrice(item);

      const product = `
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

      return product;
    }).join('');
    return products;
  }

  show = async () => {
    const render = await this.render();
    const sumPrice = await this.getSumPrice();

    const productsInCart = `
    <div class="product-list-box">
      ${render}
    </div>
    <div class="order-value"> Order value: € ${sumPrice}</div>
    `;

    this.el.innerHTML = productsInCart;

    return productsInCart;
  }

  initListeners = () => {
    this.el.querySelector('.product-list-box').addEventListener('click', (event) => {
      const { target } = event;

      if (target.getAttribute('data-button-role') !== 'checkout-remove-product') {
        return false;
      }
      if (confirm('Вы уверены, что хотите удалить этот товар из корзины?') !== true) {
        return false;
      }
      const elem = target.closest('.product-wrapper');
      const id = elem.getAttribute('data-product-id');

      this.deleteProduct(id);
    });
  }

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const deletedElement = this.el.querySelector(`div[data-product-id='${id}']`);
    const quantityEl = this.el.querySelector(`div[data-product-id='${id}'] > div.quantity > h1`);

    let quantity = quantityEl.innerText;
    if (quantity > 1) {
      quantity -= 1;
      quantityEl.innerText = quantity;
    } else {
      deletedElement.remove();
    }

    const indexOfProductToDelete = products.findIndex((product) => product.id == id);
    products.splice(indexOfProductToDelete, 1);
    const newIndexesOfProducts = products.map((product) => product.id);

    localStorage.setItem('cart-products', JSON.stringify(newIndexesOfProducts));
  }
}

export default CheckoutProductList;
