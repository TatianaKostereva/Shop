const loadProduct = () => fetch('http://localhost:3000/products').then((res) => res.json());

export default loadProduct;
