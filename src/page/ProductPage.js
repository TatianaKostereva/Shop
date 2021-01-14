import React from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import MainEmptyLayout from '@/components/ui/Layout/MainEmptyLayout';
import useDataSource from '@/db/hook/useDataSource';
import { DATA_SOURCE_PRODUCT } from '@/db/dataSourceConfig';
import { DATA_LOADED } from '@/db/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '500px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const ProductPage = () => {
  const { id } = useParams();
  const { data: product, status } = useDataSource(DATA_SOURCE_PRODUCT, id);
  const classes = useStyles();

  return (
    <MainEmptyLayout showCarousel={false}>
      {status === DATA_LOADED && (
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={product.imageUrl}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.title}
            </Typography>
          </CardContent>
        </Card>
      )}
    </MainEmptyLayout>
  );
};

/**
 *
 * oldPrice: null
 price: 399
 reviewsAmount: 14
 starts: 4
 title: "Nuraphone - Wireless Bluetooth Over-Ear Headphones"
 */

export default ProductPage;
