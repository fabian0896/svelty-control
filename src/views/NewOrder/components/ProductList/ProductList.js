import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';


import Product from './Product'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  details: {
    display: 'flex',
    width: "100%",
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  name:{
    flex: 2
  },
  size: {
    flex: 1
  },
  color:{
    flex: 1
  },
  price:{
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
}));



const ProductList = props => {
  const { className, products, ...rest } = props;

  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={1}>
      {
        products.map((product, index)=>{
          return(
            <Grid key={index} item xs={12}>
            <Product value={product} />
          </Grid>
          )
        })
      }
    </Grid>
  );
};

ProductList.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array
};

export default ProductList;
