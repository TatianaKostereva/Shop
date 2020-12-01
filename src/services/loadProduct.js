import { getUrl, getUrlWithIds } from '@/services/constants';

const loadProduct = (start, end) => fetch(getUrl('products', start, end)).then((res) => res.json());
export const loadProductByIds = (ids) => fetch(getUrlWithIds({
  entity: 'products',
  method: 'load_by_ids',
  params: {
    ids,
  },
})).then((res) => res.json());

export default loadProduct;
