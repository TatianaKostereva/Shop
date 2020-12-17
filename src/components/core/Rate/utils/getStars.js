const getStars = (res = []) => {
  if (res.data.length === 0) {
    return 0;
  }
  const stars = res.data.reduce((prevValue, item) => prevValue + +item.stars, 0) / res.data.length;
  return Math.floor(stars);
};

export default getStars;
