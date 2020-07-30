import { getUrl } from '@/services/constants';

const url = getUrl('products');
const loadProduct = () => fetch(url).then((res) => res.json());

export default loadProduct;
