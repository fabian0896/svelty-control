import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { OrderToolbar, OrderCard } from './components';

import { useHistory } from 'react-router-dom'

import { orderService } from 'firebaseService'

import { Loader } from 'components'


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
  const [disNext, setDisNex] = useState(false)
  const [disBack, setDisBack] = useState(false)
  const [ordersList, setOrdersList] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)


  const handleAddOrder = () => {
    history.push({ pathname: '/pedido/nuevo' })
  }

  useEffect(() => {
    const fecthData = async () => {
      const { data, next, back, disableBack, disableNext } = await orderService.getAllOrders()
      setOrdersList(data)
      setNextFunction(next)
      setBackFunction(back)
      setDisBack(disableBack)
      setDisNex(disableNext)
      setLoading(false)
    }
    fecthData()
  }, [])

  const handleClickOrder = (id) => () => {
    history.push({
      pathname: `/pedidos/${id}`
    })
  }

  const handleNextPage = async () => {
    setLoading(true)
    const { data, next, back, disableBack, disableNext } = await orderService.getAllOrders(nextFunction)
    setOrdersList(data)
    setNextFunction(next)
    setBackFunction(back)
    setDisBack(disableBack)
    setDisNex(disableNext)
    setPage(v => v + 1)
    setLoading(false)
  }

  const handleBackPage = async () => {
    setLoading(true)
    const { data, next, back, disableBack, disableNext } = await orderService.getAllOrders(backFunction)
    setOrdersList(data)
    setNextFunction(next)
    setBackFunction(back)
    setDisBack(disableBack)
    setDisNex(disableNext)
    setPage(v => v - 1)
    setLoading(false)
  }

  return (
    <div className={classes.root}>
      <Loader loading={loading} />
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
          <Typography variant="caption">Página {page}</Typography>
        <IconButton disabled={disBack} onClick={handleBackPage}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton disabled={disNext} onClick={handleNextPage}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default OrderList;
