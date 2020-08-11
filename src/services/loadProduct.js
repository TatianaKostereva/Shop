import { getUrl } from '@/services/constants';

const loadProduct = (start, end) => fetch(getUrl('products', start, end)).then((res) => res.json());
export const loadProductsAll = () => fetch(getUrl('products')).then((res) => res.json());

export default loadProduct;
