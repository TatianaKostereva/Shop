import queryString from 'query-string';

const API = 'http://localhost:3000';

export const getUrl = (...args) => {
  let res = `${API}/`;
  for (let arg of args) {
    res += `${arg}/`;
  }
  return res;
};

export const getUrlWithIds = ({ method, entity, params }) => {
  let res = `${API}/${entity}/`;
  if (method) {
    res += `${method}/`;
  }
  if (params) {
    res += '?' + queryString.stringify(params);
  }
  return res;
};
