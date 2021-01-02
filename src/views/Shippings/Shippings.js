import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, Backdrop, CircularProgress, Button  } from '@material-ui/core';

import {OrderResumeCard, ShippingInfo} from './components'
import {orderService, shippingService, changeService } from 'firebaseService'



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  button:{
    marginBottom: theme.spacing(2)
  }
}));

const Shippings = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([])
  const [changes, setChanges] = useState([])
  const [mergeData, setMergeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectOrder, setSelectOrder] = useState(null)

  useEffect(()=>{
    const unsubscribe = orderService.getOrderByStates((data)=>{
      console.log(data)
      setOrders(data)
      setLoading(false)
    },['packed', 'productReady'], ['withShipping','==', false])

    const changeUnsubscribe = changeService.getOrderByStates((data)=>{
      console.log(data)
      setChanges(data)
      setLoading(false)
    },['packed', 'productReady'], ['withShipping','==', false])

    return ()=>{
      unsubscribe()
      changeUnsubscribe()
    }

  },[])

  useEffect(() => {
    setMergeData([...orders, ...changes])
  },  [changes, orders])

  const handleSelect = (order)=>()=>{
      if(!selectOrder){
        setSelectOrder(order)
        return
      }
      if(order.id === selectOrder.id){
        setSelectOrder(null)
        return
      }
      setSelectOrder(order)
  }


  const handleAddShipping = (mipaquete) => async (shipping) => {
    if(!selectOrder){
      return 
    }
    setLoading(true)
    if(selectOrder.change){
      await changeService.newShippingToOrder(selectOrder,mipaquete,shipping)
      console.log("Envio de cambio")
    }else{
      await shippingService.newShippingToOrder(selectOrder,mipaquete, shipping)
    }
    setSelectOrder(null)
    setLoading(false)
  }

  const  handleGenerateChangeLabel = () => {
    console.log(JSON.stringify(changes))
  }

  return (
    <div className={classes.root}>
       <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit"/>
      </Backdrop>
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
          <ShippingInfo onAddShipping={handleAddShipping} order={selectOrder}/>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          {
            !!changes.length &&
            <Button onClick={handleGenerateChangeLabel} className={classes.button} variant="contained" color="primary" fullWidth>Generar Rotulos de Cambios</Button>
          }
          {
            mergeData.map(order=>(
              <OrderResumeCard
                title="Guias De Pedidos"
                selected={selectOrder && (order.id === selectOrder.id)}
                onSelect={handleSelect(order)} 
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
