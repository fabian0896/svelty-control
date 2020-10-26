import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';

<<<<<<< HEAD
import {
  ClientProfile,
=======
import { 
  ClientProfile, 
>>>>>>> 1d592ce44ce8bca76e2ee9071534345c8792718e
  HistoryCard,
  ProductList,
  OrderState,
  EarningsSummary,
  ShippingDetail
} from './components';

<<<<<<< HEAD
import { useParams, useHistory } from 'react-router-dom'

import * as orderService from '../../firebaseService/orders'
import { orderService as orderFirebase } from 'firebaseService'
=======
import { useParams } from 'react-router-dom'

import * as orderService from '../../firebaseService/orders'

>>>>>>> 1d592ce44ce8bca76e2ee9071534345c8792718e

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

<<<<<<< HEAD
  const { orderId } = useParams()

  const history = useHistory()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = orderService.getById(orderId, (data) => {
      setOrder(data)
      setLoading(false)
=======
  const {orderId} = useParams()

  const [order, setOrder] = useState(null)


  useEffect(()=>{
    const unsubscribe = orderService.getById(orderId, (data)=>{
      setOrder(data)
>>>>>>> 1d592ce44ce8bca76e2ee9071534345c8792718e
      console.log(data)
    })
    return () => {
      unsubscribe()
    }
<<<<<<< HEAD
  }, [])


  const handleDeleteOrder = async () => {
    setLoading(true)
    console.log("se va a elminar el pedido")
    await orderFirebase.deleteOrder(order)
    console.log("Se elmino el pedido")
    history.push({ pathname: '/pedidos' })
  }
=======
  },[])
>>>>>>> 1d592ce44ce8bca76e2ee9071534345c8792718e

  return (
    <div className={classes.root}>
      {
<<<<<<< HEAD
        loading || !order ?
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
          :
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
              <ClientProfile onDeleteOrder={handleDeleteOrder} order={order} />
              <EarningsSummary order={order} />
            </Grid>
            <Grid
              item
              lg={7}
              md={6}
              xl={7}
              xs={12}
            >
              <OrderState order={order} />
              <ProductList order={order} />
              <ShippingDetail order={order} />
              {/* <HistoryCard order={order}/>*/}
            </Grid>
          </Grid>
=======
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
          <ShippingDetail order={order}/>
         {/* <HistoryCard order={order}/>*/}
        </Grid>
      </Grid>
      :
      <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit"/>
      </Backdrop>
>>>>>>> 1d592ce44ce8bca76e2ee9071534345c8792718e
      }
    </div>
  );
};

export default OrderDetail;
