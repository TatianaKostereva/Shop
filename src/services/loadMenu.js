import { getUrl } from '@/services/constants';

const loadMenu = () => fetch(getUrl('menu')).then((res) => res.json());

export default loadMenu;
