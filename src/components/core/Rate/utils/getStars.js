const getStars = (res = []) => {
  if (res.length === 0) {
    return 0;
  }
  const stars = res.reduce((prevValue, item) => prevValue + +item.stars, 0) / res.length;
  return Math.floor(stars);
}

export default getStars;
