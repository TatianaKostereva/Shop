import {getProductsSum} from "./productUtils";

describe('Простые тест кейсы', () => {
  test('Пустая корзина', () => {
    expect(getProductsSum([])).toBe('0.00');
  });

  test('Корзина с одним товаром', () => {
    expect(getProductsSum([{
      price: 100,
      sum: 1,
    }])).toBe('100.00');
  });

  test('Корзина с несколькими товарами одного типа', () => {
    expect(getProductsSum([{
      price: 100,
      sum: 10,
    }])).toBe('1000.00');
  });

  test('Корзина с несколькими товарами разных типов', () => {
    expect(getProductsSum([{
      price: 100,
      sum: 10,
    }, {
      price: 200,
      sum: 5,
    }])).toBe('2000.00');
  });
});