import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { orders as algoliaOrders } from '../../algoliaService'
import {getRandomColor} from '../../helpers'
import {stockService} from 'firebaseService'
import _ from 'lodash'
import moment from 'moment'


const ORDERS = 'orders'

const addOrder = async (value)=>{

    const user = firebase.auth().currentUser
    const db = firebase.firestore()

    const orderId =  db.collection(ORDERS).doc().id

    const color = getRandomColor()

    const stockProductsPRomises = value.products.filter(product=>product.stock).map(product=>stockService.deleteProduct(product.id))

    await Promise.all(stockProductsPRomises)

    const state = getOrderStateByProducts(value.products)

    const order = {
        id: orderId,
        ...value,
        state,
        createdAt: new Date(),
        creatorId: user.uid,
        creatorName: user.displayName,
        color,
        withShipping: false
    }

    
    await db.collection(ORDERS).doc(orderId).set(order)
    const algoliaId = await algoliaOrders.add(order)
    console.log(algoliaId)

    return orderId
}


const deleteOrder = async (order) => {
    const id = order.id
    const db = firebase.firestore()
    await algoliaOrders.deleteOrder(order.id)
    await db.collection(ORDERS).doc(id).delete()
    return
}



const getOrderById = (id, cb)=>{
    const db = firebase.firestore()
    return db.collection(ORDERS).doc(id).onSnapshot(snap=>{
        cb(snap.data())
    })
}

const getOrderByIdPromise = async (id)=>{
    const db = firebase.firestore()
    const snap = await db.collection(ORDERS).doc(id).get()
    return snap.data()
}


const getAllOrders = async (nextQuery)=>{
    const limit = 12
    let query = null
    const db = firebase.firestore()

    if(nextQuery){
        query = nextQuery
    }else{     
        query = db.collection(ORDERS).orderBy('createdAt','desc').limit(limit)
    }

    const snap =  await query.get()
    const lastVisible = snap.docs[snap.docs.length - 1]
    const firstVisible = snap.docs[0]

    const firstElementSnap = await db.collection(ORDERS).orderBy('createdAt', 'desc').limit(1).get()
    const lastElementSnap = await  db.collection(ORDERS).orderBy('createdAt', 'desc').limitToLast(1).get()

    const lastElement = lastElementSnap.docs[0]
    const firsElement = firstElementSnap.docs[0]

    const disableNext = lastElement?.data().id === lastVisible?.data().id
    const disableBack = firsElement?.data().id === firstVisible?.data().id


    let next = null
    if(lastVisible){
        next = db.collection(ORDERS).orderBy('createdAt', 'desc').startAfter(lastVisible).limit(limit)
    }

    let back = null
    if(firstVisible){
        back = db.collection(ORDERS).orderBy('createdAt', 'desc').endBefore(firstVisible).limitToLast(limit)
    }

    const data = snap.docs.map(doc => doc.data())
    return {
        data,
        next,
        back,
        disableBack,
        disableNext 
    }
}


const getProductionOrders = (cb)=>{

    let dataPending = []
    let dataProduction = []
    
    const callBackPending = (data)=>{
        dataPending = data
        cb([...dataPending, ...dataProduction])
    }

    const callBackProduction = (data)=>{
        dataProduction = data
        cb([...dataPending, ...dataProduction])
    }

    const db = firebase.firestore()
    const collection = db.collection(ORDERS)
    const queryPending = collection.where('state','==', 'pending')
    const queryProduction = collection.where('state','==', 'production')

    const unsuscribePending = queryPending.onSnapshot((snap)=>{
        const data = snap.docs.map(doc=>doc.data()) 
        callBackPending(data)
    })
    const unsuscribeProduction = queryProduction.onSnapshot((snap)=>{
        const data = snap.docs.map(doc=>doc.data())
        callBackProduction(data) 
    })
    


    return ()=>{
        unsuscribePending()
        unsuscribeProduction()
    }
}


const setProductState = async (orderId, productIndex, state, provider={}) => {
    const {price, name} = provider
    const db = firebase.firestore()
    const orderRef = db.collection(ORDERS).doc(orderId)

    await db.runTransaction(async transaction =>{
        const orderSnap = await transaction.get(orderRef)
        const order = orderSnap.data()

        const products = [...order.products]

        products[productIndex] = {
            ...products[productIndex],
            wholesalePrice: price || products[productIndex].wholesalePrice,
            provider: name || products[productIndex].provider,
            state
        }


        const newState = getOrderStateByProducts(products)

        await transaction.update(orderRef,{
            products,
            state: newState 
        })
    })
    return
}



const getOrdersForPackaging =  (cb)=>{
    const db = firebase.firestore()
    const query = db.collection(ORDERS).where('state', '==', 'productReady')

    const unsuscribe = query.onSnapshot((snap)=>{
        const data = snap.docs.map(doc=>doc.data())
        cb(data)
    })

    return unsuscribe

}

const getOrderdispatched = (cb)=>{
    const db = firebase.firestore()
    const query = db.collection(ORDERS).where('state', '==', 'dispatched')
    const unsuscribe = query.onSnapshot(snap=>{
        const data = snap.docs.map(doc=>doc.data())
        cb(data)
    })
    return unsuscribe
}

const getOrderpacked = (cb)=>{
    const db = firebase.firestore()
    const query = db.collection(ORDERS).where('state', '==', 'packed')
    const unsuscribe = query.onSnapshot(snap=>{
        const data = snap.docs.map(doc=>doc.data())
        cb(data)
    })
    return unsuscribe
}


const setOrderState = async (orderId, state)=>{
    const db = firebase.firestore()
    const document = db.collection(ORDERS).doc(orderId)
    await document.update({
        state
    })
    return
}




const getOrderByStates = (cb, states=[], customQuery) => {

    const allData = {}


    const callback = (index) => (data)=>{    
        const newData = data.docs.map(doc=>doc.data())
        const oldData = {...allData}
        allData[states[index]] = newData
        if(!(_.isEqual(oldData, allData))){
            const result = Object.keys(allData).reduce((prev, state)=>{
                return [...prev, ...allData[state]]
            }, [])
            cb(result)
        }else{
            console.log("los datos son los mismos, no hay que llamar al callback")
        }
    }


    const db = firebase.firestore()
    const collection = db.collection(ORDERS)

    let queries = states.map(state => collection.where('state','==', state))

    if(customQuery){
        queries = queries.map(query => query.where(customQuery[0],customQuery[1], customQuery[2]))
    }

    const unsubscribes = queries.map((query, index) => {
        return query.onSnapshot(callback(index))
    })

    return ()=>{
        unsubscribes.forEach(unsubscribe=>{
            unsubscribe()
        })
    }
}



const updateOrderState = async (order, state, shipping)=>{
 
    const db = firebase.firestore()
    const doc = db.collection(ORDERS).doc(order.id)
    const updateObject = {}

    if(!!state){
        //la orden no puede ser actualizada por que no hay un estado
        updateObject.state = state
    }

    if(shipping){
        updateObject.shipping = shipping
        updateObject.guide_number =  shipping.guide_number
        updateObject.company_name = shipping.delivery_company.company_name
    }

   
    console.log("se actualizo")
    await doc.update(updateObject)

    return
}


const getCompleteOrdersByDate = async (startDate, endDate)=>{
    const db = firebase.firestore().collection(ORDERS)

    const queryDelivered = db.where("state","==","delivered").where('deliveredDate', '>=', startDate.toDate()).where('deliveredDate', '<=', endDate.toDate())
    const snapDelivered = await queryDelivered.get()
    const deliveredData = snapDelivered.docs.map(v => v.data())

    const queryReturn = db.where("state","==","return").where('deliveredDate', '>=', startDate.toDate()).where('deliveredDate', '<=', endDate.toDate())
    const snapReturn = await queryReturn.get()
    const returnData = snapReturn.docs.map(v => v.data())

    

    return [...deliveredData, ...returnData]
}




const test = async ()=>{
    const db = firebase.firestore()
    const collection = db.collection(ORDERS)
    const snap = await collection.get()
    const res = snap.docs.map(v => v.data())
    return res
}

//-----------------------------------------------------------------------------

const isEvryProductInAState = (products=[], state) =>{
    return products.reduce((prev, curr)=>{
        return prev && (curr.state === state)
    }, true)
}

const getOrderStateByProducts = (products=[])=>{
    if(isEvryProductInAState(products, 'ready')){
        return 'productReady'
    }else if(isEvryProductInAState(products, 'production')){
        return 'production'
    }else{
        return 'pending'
    }
}




export default {
    addOrder,
    getOrderById,
    getAllOrders,
    getProductionOrders,
    setProductState,
    getOrdersForPackaging,
    setOrderState,
    getOrderdispatched,
    getOrderpacked,
    getOrderByStates,
    updateOrderState,
    deleteOrder,
    getCompleteOrdersByDate,
    getOrderByIdPromise,
    test,
}