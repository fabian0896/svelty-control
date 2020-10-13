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
        console.log(actualShipping)
        updatObject = {
            withShipping: true,
            mipaquete: true,
            collection_date: 0,
            guide_number: actualShipping.guide_number || "",
            company_name: actualShipping.delivery_company.company_name || "",
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


const setOrderDispatched = async (order, shipping)=>{
    const db = firebase.firestore()
    const doc = db.collection(ORDERS).doc(order.id)

    let updateObject = {
        state: 'dispatched',
    }
    if(false/*order.mipaquete && shipping*/){
        updateObject ={
            state: 'dispatched',
            shippingMessage: "Pedido despachado",
            collection_date: shipping.pickup.collection_date,
        }
    }else{
        updateObject ={
            state: 'dispatched',
            shippingMessage: "Pedido despachado",
            collection_date: (new Date()).getTime(),
        }
    }

    doc.update(updateObject)
}

const setDeliveredOrder = async (order) =>{
    const db = firebase.firestore()
    const doc = db.collection(ORDERS).doc(order.id)
    let updateObject = {
        state: 'delivered',
        deliveredDate: new Date()
    }
    await doc.update(updateObject)
}

const setReturnOrder = async (order, price) =>{
    const db = firebase.firestore()
    const doc = db.collection(ORDERS).doc(order.id)
    let updateObject = {
        state: 'return',
        returnValue: parseInt(price)
    }
    await doc.update(updateObject)
}

const updateStateOrderByShipping = async (order, state, shipping)=>{
    const db =  firebase.firestore()
    const doc =  db.collection(ORDERS).doc(order.id)

    if(state === 'dispatched'){
        setDispatched()
    }else if(state === 'delivered'){
        setDelivered()
    }else if(state === 'return'){
        setReturn()
    }else{
        //el resto de estados no cambia nada mas que el etado ç
        //por lo que no se hace mucho aqui
    }

}




const updateMipaqueteOrders = async (orderList=[])=>{
    const mipaqueteOrders =  orderList.filter(order=>order.mipaquete)
    const promises = mipaqueteOrders.map(order=>mipaqueteService.getShippingById(order.shipping_id))
    const shippingsData = await Promise.all(promises)
    
    const updateOrderPromises = mipaqueteOrders.map((order, index)=>{
        //const shippingState = shippingsData[index].state
        const internalState = null //MIPAQUETE_STATES[shippingState]? MIPAQUETE_STATES[shippingState].internalState : null
        return orderService.updateOrderState(order, internalState, shippingsData[index])
    })
    await Promise.all(updateOrderPromises)
    return
}



//------------------------------------------------------------------------------------


const setDispatched = (order, shipping)=>{
    //si el envio es de mipaquete se busca la fecha que ellos nos dan de recogida
    //sino entonces se pone la fecha en la que se marco como despachado
    //este estado no cambia las estadisticas ya que toca esperar a ver si llega o hay devolución
    if(order.mipaquete && !!shipping){
        return {
            state: 'dispatched',
            collection_date: shipping.pickup.collection_date,
            shippingMessage: "Pedido despachado",
        }
    }else{
        return {
            state: 'dispatched',
            collection_date: (new Date()).getTime(),
            shippingMessage: "Pedido despachado",
        }
    }
}


const setDelivered = ()=>{
    //aqui hay que ver si el pedido es de mi paque o no
    //si el pedido es de mi paquete no se deben tocar las estaditicas de ganacia
    //ya que esas se actualizan cuando llegue el reporte de pagos y devoluciones de mipaquete
    //si el envio es personalizado entonces simplemente se suma la ganancia a las estadisticas

    //si el envio es por mipaquete o por cualquier medio pero es con consiganación o otro medio diferente a contra entrega 
    //el valor de la ganancia se suma directamente 


    //hay que sumar a las ganancias pendientes por combrar en caso de que no se combre instantanemente(mipaquete)
    

    //actualizar el numero de estadisticas, sumarle a entregado

}


const setReturn = ()=>{
    //si el pedido es de mi paquete, no se tocan las estadisticas 
    //ya que estas se actualizan cuando el llegue el reporte de devoluciones de mipaquete
    //si el envio es perzonalizado se resta el valor de la prenda y el valor del envio a la ganancia 

    //si el pedido es por mipaquete pero es con consignacion, el valor se suma directamente a la ganancia



}





export default {
    newShippingToOrder,
    setOrderDispatched,
    updateMipaqueteOrders,
    setDeliveredOrder,
    setReturnOrder
}