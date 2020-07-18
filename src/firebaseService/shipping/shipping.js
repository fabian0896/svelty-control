import * as firebase from 'firebase/app'
import 'firebase/firestore'
import {mipaqueteService} from 'mipaqueteService'
import {orderService} from 'firebaseService'
import {MIPAQUETE_STATES} from 'enviroment'

const ORDERS = 'orders'


const newShippingToOrder = async (order, mipaquete=true, shippingData)=>{
    const db = firebase.firestore()
    const doc = db.collection(ORDERS).doc(order.id)
    
    let updatObject = {}

    if(mipaquete){
        const actualShipping = await mipaqueteService.createShipping(order)
        updatObject = {
            withShipping: true,
            mipaquete: true,
            collection_date: 0,
            guide_number: actualShipping.guide_number,
            company_name: actualShipping.delivery_company.company_name,
            shipping_id: actualShipping._id,
            shipping_price: actualShipping.price,
            mipaquete_code: actualShipping.code,
            shipping: actualShipping
        }
    }else{
        updatObject = {
            withShipping: true,
            mipaquete: false,
            collection_date: 0,
            guide_number: shippingData.guide_number,
            company_name: shippingData.company_name,
            shipping_price: parseInt(shippingData.price),
        }
    }
    
    //tambien hay que actualizar algolia con el numero de guia y el codigo de mipaquete si tiene
    await doc.update(updatObject)

    return
}


const setOrderDispatched = async (order)=>{
    const db = firebase.firestore()
    const doc = db.collection(ORDERS).doc(order.id)

    let updateObject = {
        state: 'dispatched',
    }
    if(order.mipaquete){

    }else{
        updateObject ={
            state: 'dispatched',
            shippingMessage: "Pedido despachado",
            collection_date: (new Date()).getTime(),
        }
    }

    doc.update(updateObject)
}



const updateMipaqueteOrders = async (orderList=[])=>{
    const mipaqueteOrders =  orderList.filter(order=>order.mipaquete)
    const promises = mipaqueteOrders.map(order=>mipaqueteService.getShippingById(order.shipping_id))
    const shippingsData = await Promise.all(promises)
    
    const updateOrderPromises = mipaqueteOrders.map((order, index)=>{
        const shippingState = shippingsData[index].state
        const internalState = MIPAQUETE_STATES[shippingState]? MIPAQUETE_STATES[shippingState].internalState : null
        return orderService.updateOrderState(order, internalState, shippingsData[index])
    })
    await Promise.all(updateOrderPromises)
    return
}



export default {
    newShippingToOrder,
    setOrderDispatched,
    updateMipaqueteOrders
}