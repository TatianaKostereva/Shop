import React, {
  useCallback, useContext, useEffect, useState, useMemo,
} from 'react';
import ProductListView from '@/components/catalogOfProducts/ProductListView';
import { DBProductsContext } from '@/db/DBProducts';

const ProductList = ({ ids }) => {
  const {
    storage, loaded, loadDataByIDs, pageSize,
  } = useContext(DBProductsContext);
  const [range, setRange] = useState(pageSize);

  const productsIdsForDisplay = useMemo(() => ids.slice(0, range), [range, ids]);

  useEffect(() => {
    loadDataByIDs(productsIdsForDisplay);
  }, [productsIdsForDisplay, loadDataByIDs]);

  const loadMore = useCallback(() => {
    setRange(range + pageSize);
  }, [setRange, range, pageSize]);

  return (
    <div className="row justify-content-end">
      <div className="col-lg-9">
        <h3 className="section-title">Top Recommendations for You</h3>
        <div className="row homepage-cards">
          {productsIdsForDisplay.map((id) => storage[id] !== undefined && storage[id].status !== 'DATA_EMPTY' && <ProductListView key={id} product={storage[id]} />)}
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
