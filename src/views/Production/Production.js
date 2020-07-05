import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {ProductList, ProviderCardList} from './components'
import { orderService, productService } from 'firebaseService'
import {getProvidersFromProductsList} from 'helpers'



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Production = () => {
  const classes = useStyles();

  const [orders, setOrders] =  useState([])
  const [productList, setProductList] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(-1)
  const [isSelecting, setIsSelecting] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [providers, setProviders] = useState([])


  const getProductsFromOrders = (orderList)=>{
    return orderList.reduce((prev,curr)=>{
        const products = curr.products.map((value,index)=> ({...value, orderId: curr.id, index}))
        return [...prev, ...products]
    }, [])
}


  useEffect(()=>{
    const unsuscribeOrders = orderService.getProductionOrders((data)=>{
      setOrders(data)
    })

    const unsuscribeProducts = productService.getAllProducts((data)=>{
      setAllProducts(data)

      const providerList = getProvidersFromProductsList(data)  
      const listOfProviders = providerList.map(providerName =>{
          const productsOfProvider = data.filter(product=>(product.providers.find(provider=>provider.name === providerName)))
          const productsOfProviderObject = {}
          
          productsOfProvider.forEach(product=>{
            productsOfProviderObject[product.id] = {
              name: product.name,
              price: product.providers.find(value=>value.name === providerName).price
            }
          })
          return {
            name: providerName,
            products: productsOfProviderObject
          }
      })

      setProviders(listOfProviders)
    })

    return ()=>{
      unsuscribeProducts()
      unsuscribeOrders()
    }
  },[])


  useEffect(()=>{
    const products = getProductsFromOrders(orders)
    setProductList(products)
}, [orders])


  const handleSelectProduct = (value)=>{
    if(selectedProduct === value){
      handleCancelSelect()
      return
    }
    setSelectedProduct(value)
    setIsSelecting(true)
  }


  const handleSetProduccion = async (provider, orderId, index) =>{
    console.log(provider, index, orderId)
    await orderService.setProductState(orderId,index,'production', provider)
    console.log("se actualizo")
    setSelectedProduct(-1)
    setIsSelecting(false)
  }


  const handleProductReady = async (orderId, index)=>{
      await orderService.setProductState(orderId, index, 'ready')
  }

  const handleProductPending = async (orderId, index) => {
    const provider = {
      name: null,
      price: null
    }
    await orderService.setProductState(orderId, index, 'pending', provider)
  }

  const handleCancelSelect = ()=>{
    setIsSelecting(false)
    setSelectedProduct(-1)
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
          <ProductList
            onCancelSelect={handleCancelSelect}
            selected={selectedProduct}
            onSelect={handleSelectProduct} 
            productList={productList}
            />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <ProviderCardList
            onProductReady={handleProductReady}
            onProductPending={handleProductPending}
            productList={productList}
            isSelecting={isSelecting}
            onSetProduction={handleSetProduccion}
            selectedProduct={productList[selectedProduct]}
            allProducts={allProducts} 
            providers={providers}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Production;
