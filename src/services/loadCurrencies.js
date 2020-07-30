import { getUrl } from '@/services/constants';

const loadCurrencies = () => fetch(getUrl('currency')).then((res) => res.json());
export const loadCurrentCurrency = (current) => fetch(getUrl('currency', `${current}`)).then((res) => res.json());

export default loadCurrencies;
