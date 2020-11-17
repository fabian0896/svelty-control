import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { OrderToolbar, OrderCard } from './components';

import { useHistory } from 'react-router-dom'

import { orderService, changeService } from 'firebaseService'

import { Loader } from 'components'

import {orders as searchService} from 'algoliaService'


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
  const [tab, setTab] = useState("orders")


  const handleAddOrder = () => {
    history.push({ pathname: '/pedido/nuevo' })
  }

  const fecthData = async () => {
    const { data, next, back, disableBack, disableNext } = await orderService.getAllOrders()
    setOrdersList(data)
    setNextFunction(next)
    setBackFunction(back)
    setDisBack(disableBack)
    setDisNex(disableNext)
    setPage(1)
    setLoading(false)
  }

  const fecthChangeData = async () => {
    const { data, next, back, disableBack, disableNext } = await changeService.getAllOrders()
    setOrdersList(data)
    setNextFunction(next)
    setBackFunction(back)
    setDisBack(disableBack)
    setDisNex(disableNext)
    setPage(1)
    setLoading(false)
  }

  useEffect(() => {
    fecthData()
  }, [])

  const handleClickOrder = (id) => () => {
    history.push({
      pathname: `/pedidos/${id}`
    })
  }

  const handleNextPage = async () => {
    setLoading(true)
    const { data, next, back, disableBack, disableNext } = tab === "orders" ? await orderService.getAllOrders(nextFunction) : await changeService.getAllOrders(nextFunction)
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
    const { data, next, back, disableBack, disableNext } = tab === "orders" ? await orderService.getAllOrders(backFunction) : await changeService.getAllOrders(backFunction)
    setOrdersList(data)
    setNextFunction(next)
    setBackFunction(back)
    setDisBack(disableBack)
    setDisNex(disableNext)
    setPage(v => v - 1)
    setLoading(false)
  }

  const handleSearch = async (query) =>{
    setLoading(true)
    if(!query){
      console.log("mostrar todos los pedidos")
      await fecthData()
      setLoading(false)
      return
    }
    const result = await searchService.findOrder(query)
    setOrdersList(result)
    setDisBack(true)
    setDisNex(true)
    setLoading(false)
  }

  const handleChangeTab =async (tab) =>{
    setLoading(true)
    if(tab === "orders"){
      //hacer un fetch de los pedidos
      await fecthData()
    }else{
        // hacer un fetch de los cambios
        //const data = await changeService.getArrivedChanges()
        //setOrdersList(data)
        await fecthChangeData()
    }
    setLoading(false)
  }


  return (
    <div className={classes.root}>
      <Loader loading={loading} />
      <OrderToolbar onChangeTab={handleChangeTab} onSearch={handleSearch} onAddOrder={handleAddOrder} />
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
              <OrderCard onClick={handleClickOrder(order.change? order.orderId : order.id)} order={order} />
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
