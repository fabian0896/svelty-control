import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid,  } from '@material-ui/core';

import {OrderResumeCard, ShippingInfo} from './components'
import {orderService} from 'firebaseService'
import {mipaqueteService} from 'mipaqueteService'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Shippings = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([])
  const [selectOrder, setSelectOrder] = useState(null)

  useEffect(()=>{
    const unsubscribe = orderService.getOrderByStates((data)=>{
      console.log(data)
      setOrders(data)
    },['packed', 'productReady', 'production'])

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


  const handleAddShipping = async ()=>{
    if(!selectOrder){
      return
    }
    const data = await mipaqueteService.createShipping(selectOrder)
    console.log(data)
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
