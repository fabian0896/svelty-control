import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {  Grid } from '@material-ui/core';

import { OrderToolbar, OrderCard, Modal } from './components';

import { useHistory } from 'react-router-dom'

import {  changeService } from 'firebaseService'

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

  
  const [ordersList, setOrdersList] = useState([])
  const [loading, setLoading] = useState(true)
  const [change, setChange] = useState(null)

  const handleAddOrder = () => {
    history.push({ pathname: '/pedido/nuevo' })
  }

 

  useEffect(() => {
      const unsuscribe = changeService.getChangesNotArrive((data)=>{
        setOrdersList(data)
        setLoading(false)
      })
      return ()=>{
        unsuscribe()
      }
  }, [])


  const handleClickOrder = (id) => () => {
    history.push({
      pathname: `/pedidos/${id}`
    })
  }

  

  const handleSearch = async (query) =>{
    setLoading(true)
    if(!query){
      console.log("mostrar todos los pedidos")
     //aqui va la busqueda 
      setLoading(false)
      return
    }
    const result = await searchService.findOrder(query)
    setOrdersList(result)
    setLoading(false)
  }

  const handleOpenModal = (change)=>()=>{
      setChange(change)
  }

  const handleDeleteChange = async () => {
    setLoading(true)
    await changeService.deleteChange(change.id)
    setChange(null)
    setLoading(false)
  }

  return (
    <div className={classes.root}>
      <Modal onDelete={handleDeleteChange} open={!!change} serialNumber={change?.serialNumber} onClose={()=>setChange(null)}/>
      <Loader loading={loading} />
      <OrderToolbar onSearch={handleSearch} onAddOrder={handleAddOrder} />
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
              <OrderCard onOpenModal={handleOpenModal(order)}  onClick={handleClickOrder(order.orderId)} order={order} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default OrderList;
