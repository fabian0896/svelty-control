import React, { useEffect, useState } from 'react';
import { OrderToolbar, OrderListTable, ConfirmModal } from './components';
import { Loader } from 'components'
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core'
import { orderService, shippingService } from 'firebaseService'
import { order } from 'firebaseService/orders';

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
  divider: {
    margin: `${theme.spacing(2)}px 0px`
  }
}));



const Transit = props => {

  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [otherOrders, setOtherOrders] = useState([])
  const [mipaqueteOrders, setmipaqueteOrders] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [returnData, setReturnData] = useState(null)
  const [ordersIdsReturn, setOrdersIdsReturn] = useState([])

  const classes = useStyles();

  useEffect(() => {
    let firstTime = true
    orderService.getOrderByStates((data) => {
      const mipaqueteOrdersData = data.filter(v => v.mipaquete)
      const otherOrdersData = data.filter(v => !v.mipaquete)
      setOtherOrders(otherOrdersData)
      setmipaqueteOrders(mipaqueteOrdersData)
      setOrders(data)
      
      if(firstTime){
        shippingService.updateMipaqueteOrders(data).then(()=> setLoading(false))
        firstTime = false
      }
    }, ['dispatched'])
  }, [])



  const handelSetDelivered = async (ids) => {
    console.log(ids)
    setLoading(true)
    for (let id of ids) {
      await shippingService.setDeliveredOrder(id)
    }
    setLoading(false)
  }


  const handleSaveReturnOrder = async ({ price }) => {
    await shippingService.setReturnOrder(returnData, price)
    const temArray = [...ordersIdsReturn]
    temArray.shift()
    setOrdersIdsReturn(temArray)
    console.log("Se marco como devolucion con un valor de " + price)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenRetrnModal = (orderIds) => {
    const ordersData = orderIds.map(orderId => orders.find(v => v.id === orderId))
    setOrdersIdsReturn(ordersData)
  }

  useEffect(()=>{
    if(!ordersIdsReturn.length){
      setOpenModal(false)
      setReturnData(null)
      return
    }

    setReturnData(ordersIdsReturn[0])
    setOpenModal(true)
  }, [ordersIdsReturn])

  return (
    <div className={classes.root}>
      <ConfirmModal onSave={handleSaveReturnOrder} order={returnData} open={openModal} onClose={handleCloseModal} />
      <Loader loading={loading} />
      <OrderToolbar />
      <div className={classes.content}>
        <OrderListTable
          mipaquete
          onSetReturn={handleOpenRetrnModal}
          onSetDelivered={handelSetDelivered}
          orders={mipaqueteOrders} />
        <Divider className={classes.divider} />
        <OrderListTable
          onSetReturn={handleOpenRetrnModal}
          onSetDelivered={handelSetDelivered}
          orders={otherOrders} />

      </div>

    </div>
  )
}




export default Transit

