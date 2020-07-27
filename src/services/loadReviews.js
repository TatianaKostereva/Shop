import { getServer, URL } from '@/services/constants';

const url = getServer(URL, 'reviews', 'get_by_product');
const loadReviews = (productId) => fetch(`${url}/${productId}`).then((res) => res.json());

export default loadReviews;
