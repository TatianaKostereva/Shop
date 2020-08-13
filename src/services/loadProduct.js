import { getUrl } from '@/services/constants';

const loadProduct = (start, end) => fetch(getUrl('products', start, end)).then((res) => res.json());
export const loadProductByIds = (ids) => fetch(getUrl('products', 'load_by_ids', ids)).then((res) => res.json());

export default loadProduct;
