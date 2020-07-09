import React, {useMemo} from 'react';
import {getProductsSum} from "@/utils/productUtils";

const sum = (a, b) => +a + +b;

const useProductsSum =  (products) => {
    const sumPrice = useMemo(() => {
        return getProductsSum(products)
    }, [products]);

    return sumPrice;
};

export default useProductsSum;