import React, {
  useCallback, useState, useMemo,
} from 'react';
import ProductListView from '@/components/catalogOfProducts/ProductListView';

const pageSize = 3;

const ProductList = ({ ids }) => {
  const [range, setRange] = useState(pageSize);

  const productsIdsForDisplay = useMemo(() => ids.slice(0, range), [range, ids]);

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
        {productsIdsForDisplay.length !== ids.length ? (
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
