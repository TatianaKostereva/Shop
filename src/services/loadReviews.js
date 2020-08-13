import { getUrl } from '@/services/constants';

const loadReviews = (productId) => fetch(getUrl('reviews', 'get_by_product', productId)).then((res) => res.json());

export default loadReviews;
