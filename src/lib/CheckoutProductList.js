class CheckoutProductList {
  productsStoreKey = 'cart-products';

  constructor(parentElement) {
    this.el = parentElement;
    this.getProducts();
    this.show();
    this.initListeners();
  }

  getProducts() {
    let productsLocalStorage = localStorage.getItem('cart-products');
    let productsInCart = JSON.parse(productsLocalStorage) || [];
    return productsInCart;
  }

  getSumPrice() {
    const products = this.getProducts();
    const sum = products
      .map(item => item.price)
      .join('')
      .match(/-?\d+(\.\d+)?/g)
      .reduce((a, b) => +a + +b, 0)
      .toFixed(2);

    return sum;
  }

  getRate(item) {

    const stars = new Array(5).fill('').map((value, index) => {
      if (item.rating != null) {
        let modificator = index < item.rating.stars ? 'checked' : 'active';
        return `<i class="icon-star ${modificator}"></i>`
      } else {
        return `<i class="icon-star"></i>`
      }
    }).join('');
    const reviews = item.rating === null ? 0 : item.rating.reviewsAmount;

    return `
        <div class = "rate" >
            ${stars}
        </div>
        <p class="rate-amount d-none d-md-block mt-1">${reviews} reviews <p>
    `

  }

  getPrice(item) {
    return `
    <div class="product-price">
      <p class="mb-0 font-weight-light">Price:</p>
      <h4 class="col-title price-text mb-2">${item.price}</h4>
    </div>
    `;
  }

  getArray() {
    const arrayOfProductsInCart = this.getProducts();

    const counter = arrayOfProductsInCart.reduce(function (obj, item) {
      if (!obj.hasOwnProperty(item.id)) {
        obj[item.id] = 0;
      }
      obj[item.id]++;
      return obj;
    }, {});

    const counterObj = Object.keys(counter).map(function (id) {
      return {id: id, sum: counter[id]};
    });

    const arrayWithoutRepeat = arrayOfProductsInCart.filter((el, index) => {
      return index === arrayOfProductsInCart.findIndex(obj => {
        return JSON.stringify(obj) === JSON.stringify(el);
      });
    });

    function merge() {
      let hash = {}; // временный хэш объектов по свойству id
      for (let l = 0; l < arguments.length; l++) {
        const array = arguments[l];
        if (!array.length) continue;
        for (let i = 0; i < array.length; i++) {
          let el = array[i];
          if (!('id' in el)) continue;
          let id = el.id;
          if (!hash[id]) hash[id] = {};
          for (let key in el) {
            if (el.hasOwnProperty(key))
              hash[id][key] = el[key];
          }
        }
      }
      let result = [];
      for (let id in hash) {
        if (hash.hasOwnProperty(id)) {
          result.push(hash[id]);
        }
      }
      return result;
    }

    const resultArray = merge(arrayWithoutRepeat, counterObj);
    return resultArray;
  }

  render() {
    const array = this.getArray();
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

  show() {
    const render = this.render();
    const sumPrice = this.getSumPrice();
    console.log(sumPrice)
    const productsInCart = `
    <div class="product-list-box">
      ${render}
    </div>
    <div class="order-value"> Order value: € ${sumPrice}</div>
    `;

    return this.el.innerHTML = productsInCart;
  }

  initListeners() {
    this.el.querySelector('.product-list-box').addEventListener('click', event => {
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

  deleteProduct(id) {
    const products = this.getProducts();
  
    const deletedElement = this.el.querySelector(`div[data-product-id='${id}'] > div.quantity > h1`);

    let quantity = deletedElement.innerText;
    console.log(quantity);
    if (quantity  > 1 ) {
      quantity -= 1;
      deletedElement.innerText = quantity ;
    } else {
      deletedElement.remove();
    }
    
    const indexOfProductToDelete = products.findIndex(product => product.id == id)
    products.splice(indexOfProductToDelete,1);
  
    localStorage.setItem('cart-products', JSON.stringify(products));
  }

}

export default CheckoutProductList;
