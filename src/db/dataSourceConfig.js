import { loadProductByIds } from '@/services/loadProduct';
import { loadReviewsById } from '@/services/loadReviews';

export const DATA_SOURCE_PRODUCT = 'DATA_SOURCE_PRODUCT';
export const DATA_SOURCE_REVIEW = 'DATA_SOURCE_REVIEW';

const storageMapperByID = (storage, item) => {
  storage[item.id] = {
    data: item,
  };
  return true;
};

const storageMapperByProductID = (storage, item) => {
  storage[item.product_id].data.push(item);
  return true;
};

const dataSourceConfig = {
  [DATA_SOURCE_PRODUCT]: {
    storageMapper: storageMapperByID,
    loadDataByIDs: loadProductByIds,
  },
  [DATA_SOURCE_REVIEW]: {
    storageMapper: storageMapperByProductID,
    loadDataByIDs: loadReviewsById,
  },
};

export default dataSourceConfig;
