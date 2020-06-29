import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  ProductForm,
  Products
} from './components'


import { productService } from '../../firebaseService'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));



const ProductList = () => {
  const classes = useStyles();

  const [products, setProducts] =  useState([])

  const handleAddProduct = async (value) =>{
    await productService.addProduct(value)
  }

  useEffect(()=>{
    const unsuscribe = productService.getAllProducts((data)=>{
      setProducts(data)
      console.log(data)
    })
    return ()=>{
      unsuscribe()
    }
  },[])

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={5}
          md={5}
          xl={5}
          xs={12}
        >
          <ProductForm products={products} onAdd={handleAddProduct} />
        </Grid>
        <Grid
          item
          lg={7}
          md={7}
          xl={7}
          xs={12}
        >
          <Products products={products}/> 
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductList;
