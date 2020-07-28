import { getServer, URL } from '@/services/constants';

const url = getServer(URL, 'currency');
const loadCurrency = () => fetch(url).then((res) => res.json()).then((data) => {
  const currency = data.reduce((prevValue, item) => {
    prevValue += Object.values(item);
    return prevValue;
  }, '');
  return currency;
});

export default loadCurrency;
