import getStars from './getStars';

describe('Простые тест кейсы', () => {
  test('Продукт без отзывов', () => {
    expect(getStars([])).toBe(0);
  });

  test('Продукт с отличными отзывами', () => {
    expect(getStars([{
      stars: 5,
    }, {
      stars: 5,
    }])).toBe(5);
  });

  test('Продукт со смешанными отзывами', () => {
    expect(getStars([{
      stars: 0,
    }, {
      stars: 5,
    }])).toBe(2);
  });
});
