'use strict';

class CheckoutProductList {
  productsStoreKey = 'cart-products';

  constructor(parentElement) {
    this.productsUrl = '/assets/data/products.json';
    this.el = parentElement;
    this.load().then((products) => {
      console.log(products)
      this.getProducts(products);
      this.getSumPrice();
      this.getArray();
      this.show();
      this.initListeners();
    });
  }

  load() {
    return fetch(this.productsUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.data = data;
        
        return this.data;
      })
      .then((products) => {
        
        products.map(product => {
        const temp = product.price.split(/\B\s/);
        product.price = temp[1];
        product.currency = temp[0];
        console.log(product)
        return { 
          ...product,
          price: temp[1],
          currency: temp[0]
        }
        });
        console.log(products)
        return products;
      })
  }

  getProducts(products) {
    
    const productsLocalStorage = localStorage.getItem('cart-products');
    const idProductsInCart = JSON.parse(productsLocalStorage) || [];
    
    console.log(idProductsInCart)
      let productsInCart = [];
      for (let id of idProductsInCart) {
        productsInCart = products.filter(el => el.id == +id);
      }
      console.log(productsInCart);
  
    return productsInCart;
    
  }

  getSumPrice() {
    
    const products = this.getProducts();
    const arr = products.map(item => item.price);

    console.log(arr);

    let sum = 0;
    for (let item of arr) {
      sum+= +item;
    }
      
    console.log(sum);
    return sum.toFixed(2);
    
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
      <h4 class="col-title price-text mb-2">${item.currency} ${item.price}</h4>
    </div>
    `;
  }

  getArray() {
   
    const arrayOfProductsInCart = this.getProducts();

    const map = arrayOfProductsInCart.reduce(function (obj, item) {
      if (!obj.hasOwnProperty(item.id)) {
        obj[item.id] = item;
        obj[item.id]['sum'] = 0;
      }
      obj[item.id]['sum']++;
      return obj;
    }, {});

    console.log(map);

    const resultArray = [];
    for(let obj in map) { 
      resultArray.push(map[obj]); 
    }

    console.log(resultArray)
    return resultArray;
    
  }

  render() {

    const array = this.getArray();
    console.log(array)
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

    const deletedElement = this.el.querySelector(`div[data-product-id='${id}']`);
  
    const quantityEl = this.el.querySelector(`div[data-product-id='${id}'] > div.quantity > h1`);

    let quantity = quantityEl.innerText;
    if (quantity  > 1 ) {
      quantity -= 1;
      quantityEl.innerText = quantity ;
    } else {
      deletedElement.remove();
    }
    
    const indexOfProductToDelete = products.findIndex(product => product.id == id)
    products.splice(indexOfProductToDelete,1);
  
    localStorage.setItem('cart-products', JSON.stringify(products));
  }

}

window.CheckoutProductList = CheckoutProductList;