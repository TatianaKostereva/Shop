import { getUrl, getUrlWithIds } from '@/services/constants';

const loadReviews = (start, end) => fetch(getUrl('reviews', start, end)).then((res) => res.json());
export const loadReviewsById = (ids) => fetch(getUrlWithIds({
  entity: 'reviews',
  method: 'load_by_ids',
  params: {
    ids,
  },
})).then((res) => res.json());

export default loadReviews;
