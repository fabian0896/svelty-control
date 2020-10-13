import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { OrderToolbar, OrderCard } from './components';

import { useHistory } from 'react-router-dom'

import {orderService} from 'firebaseService'

import {Loader } from 'components'


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
  }
}));

const OrderList = () => {
  const classes = useStyles();

  const history = useHistory()

  const [nextFunction, setNextFunction] = useState(null)
  const [backFunction, setBackFunction] = useState(null)
  const [ordersList, setOrdersList] = useState([])
  const [loading, setLoading] = useState(true)


  const handleAddOrder = ()=>{
    history.push({pathname: '/pedido/nuevo'})
  }

  useEffect(()=>{
    const fecthData = async ()=>{
      const {data, next, back} = await orderService.getAllOrders()
      setOrdersList(data)
      setNextFunction(next)
      setBackFunction(back)
      setLoading(false)
    }
    fecthData()
  },[])

  const handleClickOrder = (id)=>()=>{
    history.push({
      pathname: `/pedidos/${id}`
    })
  }

  const handleNextPage = async ()=>{
    setLoading(true)
    const {data, next, back} = await orderService.getAllOrders(nextFunction)
    setOrdersList(data)
    setNextFunction(next)
    setBackFunction(back)
    setLoading(false)
  }

  const handleBackPage = async ()=>{
    setLoading(true)
    const {data, next, back} = await orderService.getAllOrders(backFunction)
    setOrdersList(data)
    setNextFunction(next)
    setBackFunction(back)
    setLoading(false)
  }

  return (
    <div className={classes.root}>
      <Loader loading={loading}/>
      <OrderToolbar onAddOrder={handleAddOrder} />
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
              <OrderCard onClick={handleClickOrder(order.id)} order={order} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-30 of 300</Typography>
        <IconButton onClick={handleBackPage}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton disabled={!nextFunction} onClick={handleNextPage}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default OrderList;
