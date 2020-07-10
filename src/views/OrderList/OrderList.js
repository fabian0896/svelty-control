import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { OrderToolbar, OrderCard } from './components';

import { useHistory } from 'react-router-dom'

import {orderService} from 'firebaseService'

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

  const [nextFunction, setNextFunction] = useState()
  const [ordersList, setOrdersList] = useState([])



  const handleAddOrder = ()=>{
    history.push({pathname: '/pedido/nuevo'})
  }

  useEffect(()=>{
    const fecthData = async ()=>{
      const data = await orderService.getAllOrders()
      setOrdersList(data)
    }
    fecthData()
  },[])

  const handleClickOrder = (id)=>()=>{
    history.push({
      pathname: `/pedidos/${id}`
    })
  }

  const handleNextPage = async ()=>{
      const data = await nextFunction
      console.log(data)
  }

  return (
    <div className={classes.root}>
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
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={handleNextPage}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default OrderList;
