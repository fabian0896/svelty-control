import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ClientInfo , ProducstInfo, ProductList } from './components';
import { value } from 'numeral';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([])

  const handleAddProduct = (values, actions) =>{
    const newProduct = {
      ...values,
      price: parseInt(values.price),
      provider: null,
      wholesalePrice: null,
      state: "pending"
    }
    setProducts(prev => [...prev, newProduct])
    actions.resetForm()
  } 


  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <ProducstInfo onAddProduct={handleAddProduct} />
          <ProductList products={products} />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <ClientInfo products={products} />
        </Grid>
  
      </Grid>
    </div>
  );
};

export default Account;
