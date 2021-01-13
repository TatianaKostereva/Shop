import React from 'react';
import useDataSource from '@/db/hook/useDataSource';
import { DATA_LOADED } from '@/db/constants';

const DataSourceProvider = (key, Component) => {
  const ComponentWithData = (props) => {
    const { id } = props;
    const { data, status } = useDataSource(key, id);

    if (status !== DATA_LOADED) {
      return false;
    }

    return <Component {...props} data={data} />;
  };
  return ComponentWithData;
};

export default DataSourceProvider;
