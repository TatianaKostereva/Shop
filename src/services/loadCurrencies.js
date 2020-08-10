import { getUrl } from '@/services/constants';

const loadCurrencies = (start, end) => fetch(getUrl('currency', start, end)).then((res) => res.json());

export default loadCurrencies;
