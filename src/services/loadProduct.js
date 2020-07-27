import { getServer, URL } from '@/services/constants';

const url = getServer(URL, 'products');
const loadProduct = () => fetch(url).then((res) => res.json());

export default loadProduct;
