import { getUrl } from '@/services/constants';

const url = getUrl('reviews', 'get_by_product');
const loadReviews = (productId) => fetch(`${url}/${productId}`).then((res) => res.json());

export default loadReviews;
