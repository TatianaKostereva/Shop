import { getUrl } from '@/services/constants';

const loadReviews = (start, end) => fetch(getUrl('reviews', start, end)).then((res) => res.json());
export const loadReviewsById = (ids) => fetch(getUrl('reviews', 'load_by_ids', ids)).then((res) => res.json());

export default loadReviews;
