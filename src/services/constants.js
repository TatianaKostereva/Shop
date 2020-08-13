const API = 'http://localhost:3000';

function isObject(obj) {
  return (typeof obj === 'object' && obj !== null) || typeof obj === 'function';
}

export const getUrl = (...args) => {
  let res = `${API}/`;
  for (let arg of args) {
    const checking = isObject(arg);
    if (checking) {
      arg = arg.reduce((prev, item) => {
        prev += `ids=${item}&`;
        return prev;
      }, '?');
    }
    res += `${arg}/`;
  }
  return res;
};
