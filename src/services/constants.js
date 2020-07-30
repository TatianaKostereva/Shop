const API = 'http://localhost:3000';

export const getUrl = (...args) => {
  return `${API}/${args.join('/')}`;
};
