import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Backdrop, CircularProgress  } from '@material-ui/core';

import {OrderResumeCard, ShippingInfo} from './components'
import {orderService, shippingService} from 'firebaseService'



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Shippings = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectOrder, setSelectOrder] = useState(null)

  useEffect(()=>{
    const unsubscribe = orderService.getOrderByStates((data)=>{
      console.log(data)
      setOrders(data)
      setLoading(false)
    },['packed', 'productReady'], ['withShipping','==', false])

    return ()=>{
      unsubscribe()
    }

  },[])


  const handleSelect = (order)=>()=>{
      if(!selectOrder){
        setSelectOrder(order)
        return
      }
      if(order.id === selectOrder.id){
        setSelectOrder(null)
        return
      }
      setSelectOrder(order)
  }


  const handleAddShipping = (mipaquete) => async (shipping) => {
    if(!selectOrder){
      return 
    }
    setLoading(true)
    await shippingService.newShippingToOrder(selectOrder,mipaquete, shipping)
    setSelectOrder(null)
    setLoading(false)
  }


  return (
    <div className={classes.root}>
       <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit"/>
      </Backdrop>
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
          <ShippingInfo onAddShipping={handleAddShipping} order={selectOrder}/>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          {
            orders.map(order=>(
              <OrderResumeCard
                selected={selectOrder && (order.id === selectOrder.id)}
                onSelect={handleSelect(order)} 
                order={order} 
                key={order.id}/>
            ))
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default Shippings;
