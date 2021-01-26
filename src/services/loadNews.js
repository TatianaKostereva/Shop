import { getUrl } from '@/services/constants';

const loadNews = () => fetch(getUrl('news')).then((res) => res.json());

export default loadNews;