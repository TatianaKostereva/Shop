import { getUrl } from '@/services/constants';

const getProductsForMain = () => fetch(getUrl('products', 'productsForMain')).then((res) => res.json());

export default getProductsForMain;
