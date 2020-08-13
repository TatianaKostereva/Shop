import { getUrl } from '@/services/constants';

const loadSlides = () => fetch(getUrl('slides')).then((res) => res.json());

export default loadSlides;
