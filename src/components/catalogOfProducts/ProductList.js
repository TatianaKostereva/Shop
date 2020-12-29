import React, {
  useCallback, useContext, useEffect, useState, useMemo,
} from 'react';
import ProductListView from '@/components/catalogOfProducts/ProductListView';
import { DBContext, DATA_SOURCE_PRODUCT } from '@/db/DBComponent';

const pageSize = 3;

const ProductList = ({ ids }) => {
  const {
    loaded, loadDataByIDs,
  } = useContext(DBContext);
  const [range, setRange] = useState(pageSize);

  const productsIdsForDisplay = useMemo(() => ids.slice(0, range), [range, ids]);

  useEffect(() => {
    loadDataByIDs(DATA_SOURCE_PRODUCT, productsIdsForDisplay);
  }, [productsIdsForDisplay]);

  const loadMore = useCallback(() => {
    setRange(range + pageSize);
  }, [setRange, range]);

  return (
    <div className="row justify-content-end">
      <div className="col-lg-9">
        <h3 className="section-title">Top Recommendations for You</h3>
        <div className="row homepage-cards">
          {productsIdsForDisplay.map((id) => <ProductListView key={id} id={id} />)}
        </div>
        {loaded && productsIdsForDisplay.length !== ids.length ? (
          <div>
            <button className="showMore" onClick={loadMore}>Show more</button>
          </div>
        )
          : (productsIdsForDisplay.length === ids.length) ? (
            <div />
          )
            : 'Loading...'}
      </div>
    </div>
  );
};

export default ProductList;
