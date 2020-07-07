import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid,  } from '@material-ui/core';

import {OrderResumeCard, ShippingInfo} from './components'
import {orderService} from 'firebaseService'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Shippings = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    const unsubscribe = orderService.getOrderByStates((data)=>{
      console.log(data)
      setOrders(data)
    },['packed', 'productReady', 'production'])

    return ()=>{
      unsubscribe()
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
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <ShippingInfo/>
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
