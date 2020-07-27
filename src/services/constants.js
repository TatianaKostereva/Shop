export const URL = 'http://localhost:3000';

export const getServer = (url, ...args) => {
  let res = `${url}`;
  for (const arg of args) {
    res += `/${arg}`;
  }
  return res;
};
