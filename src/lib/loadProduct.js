const loadProduct = (productsUrl) => fetch(productsUrl)
  .then((res) => res.json())
  .then((data) => data.map((product) => {
    const temp = product.price.split(' ');

    product.price = temp[1];
    product.currency = temp[0];

    return {
      ...product,
      price: temp[1],
      currency: temp[0],
    };
  }));

export default loadProduct;