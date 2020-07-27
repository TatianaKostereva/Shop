const getStars = (reviews = []) => {
  if (reviews.length === 0) {
    return 0;
  }
  const stars = reviews.reduce((prevValue, item) => prevValue + +item.stars, 0) / reviews.length;
  return Math.floor(stars);
}

export default getStars;
