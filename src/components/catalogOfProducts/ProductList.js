import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import ProductListView from '@/components/catalogOfProducts/ProductListView';
import { DBProductsContext } from '@/db/DBProducts';

const ProductList = () => {
  const { productsList, loaded, loadData } = useContext(DBProductsContext);
  const [range, setRange] = useState([1, 6]);

  useEffect(() => {
    loadData(range[0], range[1]);
  }, [range]);

  const loadMore = useCallback(() => {
    setRange([range[1] + 1, range[1] + 3]);
  }, [setRange, range]);

  return (
    <div className="row justify-content-end">
      <div className="col-lg-9">
        <h3 className="section-title">Top Recommendations for You</h3>
        <div className="row homepage-cards">
          {productsList.map((item) => <ProductListView key={item.id} product={item} />)}
        </div>
        {loaded ? (
          <div>
            <button className="showMore" onClick={loadMore}>Show more</button>
          </div>
        ) : 'Loading...'}
      </div>
    </div>
  );
};

export default ProductList;
