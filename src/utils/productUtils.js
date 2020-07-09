const sum = (a, b) => +a + +b;

export const getProductsSum = (products) => {
    return products
        .map((value) => value.price * value.sum)
        .reduce(sum, 0)
        .toFixed(2);
};