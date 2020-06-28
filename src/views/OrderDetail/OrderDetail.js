import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';

import { 
  ClientProfile, 
  HistoryCard,
  ProductList,
  OrderState,
  EarningsSummary,
  ShippingDetail
} from './components';

import { useParams } from 'react-router-dom'

import * as orderService from '../../firebaseService/orders'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const OrderDetail = () => {
  const classes = useStyles();

  const {orderId} = useParams()

  const [order, setOrder] = useState(null)


  useEffect(()=>{
    const unsubscribe = orderService.getById(orderId, (data)=>{
      setOrder(data)
    })
    return () => {
      unsubscribe()
    }
  },[])

  return (
    <div className={classes.root}>
      {
        !!order ?

      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={5}
          md={6}
          xl={5}
          xs={12}
        >
          <ClientProfile order={order} />
          <EarningsSummary order={order}/>
        </Grid>
        <Grid
          item
          lg={7}
          md={6}
          xl={7}
          xs={12}
        >
          <OrderState order={order}/>
          <ProductList order={order}/>
          <ShippingDetail/>
          <HistoryCard order={order}/>
        </Grid>
      </Grid>
      :
      <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit"/>
      </Backdrop>
      }
    </div>
  );
};

export default OrderDetail;
