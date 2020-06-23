const observers = [];

const getProducts = (products = []) => {
  const productsLocalStorage = localStorage.getItem('cart-products');
  const idProductsInCart = JSON.parse(productsLocalStorage) || [];

  const listOfProducts = idProductsInCart.map((id) => {
    return products.find((product) => product.id == id);
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

const deleteProduct = (productId) => {
  const productsLocalStorage = localStorage.getItem('cart-products');
  const idProductsInCart = JSON.parse(productsLocalStorage) || [];
  const indexOfProductToDelete = idProductsInCart.findIndex((id) => productId == id);

  idProductsInCart.splice(indexOfProductToDelete, 1);

  localStorage.setItem('cart-products', JSON.stringify(idProductsInCart));

  observers.forEach((observer) => observer())
};

const setObserver = (observer) => {
  observers.push(observer)
};

const CartService = {
  getProducts: getProducts,
  deleteProduct: deleteProduct,

  setObserver: setObserver
};

export default CartService;

