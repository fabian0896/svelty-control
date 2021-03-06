import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography, Modal } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { OrderToolbar, OrderCard, ConfirmModal } from './components';

import { useHistory } from 'react-router-dom'

import {orderService, shippingService} from 'firebaseService'

import {Loader} from 'components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  noOrderContainer:{
    padding: theme.spacing(10)
  }
}));

const OrderList = () => {
  const classes = useStyles();

  const history = useHistory()

  const [ordersList, setOrdersList] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [returnData, setReturnData] = useState(null)

  const handleAddOrder = ()=>{
    history.push({pathname: '/pedido/nuevo'})
  }

  useEffect(()=>{
    let firstTime = true
    const unsubscribe = orderService.getOrderByStates((data)=>{
      setOrdersList(data)
      shippingService.updateMipaqueteOrders(data)
      setLoading(false)
    },['packed', 'productReady'], ['withShipping','==', true])

    return ()=>{
      unsubscribe()
    }
  },[])

  const handleClickOrder = (id)=>()=>{
    history.push({
      pathname: `/pedidos/${id}`
    })
  }

 

  const handleDispatchedOrder = (order)=> async ()=>{
    await shippingService.setOrderDispatched(order)
  }

  const handleDeliveredOrder = (order)=> async ()=>{
    await shippingService.setDeliveredOrder(order)
  }


  const handleOpenRetrnModal = (order) => ()=>{
    setOpenModal(true)
    setReturnData(order)
  } 

  const handleSaveReturnOrder = async ({price})=>{
      await shippingService.setReturnOrder(returnData, price)
      console.log("Se marco como devolucion con un valor de " +  price)
  }

  const handleCloseModal = ()=>{
    setOpenModal(false)
  }

  return (
    <div className={classes.root}>
      <Loader loading={loading}/>
      <ConfirmModal onSave={handleSaveReturnOrder} order={returnData} open={openModal}  onClose={handleCloseModal}/>
      <OrderToolbar onAddOrder={handleAddOrder} />
      {
        !!ordersList.length?
        <Fragment>

          <div className={classes.content}>
            <Grid
              container
              spacing={3}
            >
              {ordersList.map(order => (
                <Grid
                  item
                  key={order.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <OrderCard
                    onReturn={handleOpenRetrnModal(order)}
                    onDispatched={handleDispatchedOrder(order)}
                    onDelivered={handleDeliveredOrder(order)} 
                    onClick={handleClickOrder(order.id)} 
                    order={order} />
                </Grid>
              ))}
            </Grid>
          </div>
        </Fragment>
        :
        <Fragment>
          <div className={classes.noOrderContainer}>
            <Typography variant="h3" align="center">No hay pedidos pendientes para depsacho con guias.</Typography>
          </div>
        </Fragment>
      }
    </div>
  );
};

export default OrderList;
