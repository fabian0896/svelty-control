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
  const [editIndex, setEditIndex] = useState(-1)

  const handleAddProduct = async (value) =>{
    if(editIndex >= 0){
      // se va editar una prenda
      const id = products[editIndex].id
      await productService.editProduct({...value, id})
    } else{
      //es una prenda nueva
      await productService.addProduct(value)
    }
    setEditIndex(-1)
  }


  const handleDeleteProduct = async () =>{
      await productService.deleteProduct(products[editIndex].id)
      setEditIndex(-1)
  }


  const handleEditProduct = (index)=>()=>{
      setEditIndex(index)
  } 


  const handleCancelEdit = () =>{
    setEditIndex(-1)
  }


  useEffect(()=>{
    const unsuscribe = productService.getAllProducts((data)=>{
      setProducts(data)

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
          <ProductForm 
            onDeleteProduct={handleDeleteProduct}
            onCancelEdit={handleCancelEdit} 
            editIndex={editIndex} 
            products={products} 
            onAdd={handleAddProduct} />
        </Grid>
        <Grid
          item
          lg={7}
          md={7}
          xl={7}
          xs={12}
        >
          <Products editIndex={editIndex} onEditProduct={handleEditProduct} products={products}/> 
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductList;
