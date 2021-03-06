import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';

import {
  ClientProfile,
  HistoryCard,
  ProductList,
  OrderState,
  EarningsSummary,
  ShippingDetail,
} from './components';

import { useParams, useHistory } from 'react-router-dom'

import * as orderService from '../../firebaseService/orders'
import { orderService as orderFirebase } from 'firebaseService'

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

  const { orderId } = useParams()

  const history = useHistory()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = orderService.getById(orderId, (data) => {
      setOrder(data)
      setLoading(false)
      console.log(data)
    })
    return () => {
      unsubscribe()
    }
  }, [])


  const handleDeleteOrder = async () => {
    setLoading(true)
    console.log("se va a elminar el pedido")
    await orderFirebase.deleteOrder(order)
    console.log("Se elmino el pedido")
    history.push({ pathname: '/pedidos' })
  }


  const handleAddChange = ()=>{
    history.push({ pathname: `/cambios/nuevo/${order.id}`, })
  }

  return (
    <div className={classes.root}>
      {
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
              <ClientProfile onAddChange={handleAddChange} onDeleteOrder={handleDeleteOrder} order={order} />
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
      }
    </div>
  );
};

export default OrderDetail;
