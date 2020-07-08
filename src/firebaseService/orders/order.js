import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { orders as algoliaOrders } from '../../algoliaService'
import {getRandomColor} from '../../helpers'
import {stockService, orderService} from 'firebaseService'
import { all } from 'underscore'

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
        color
    }

    
    await db.collection(ORDERS).doc(orderId).set(order)
    const algoliaId = await algoliaOrders.add(order)
    console.log(algoliaId)

    return orderId
}




const getOrderById = (id, cb)=>{
    const db = firebase.firestore()
    return db.collection(ORDERS).doc(id).onSnapshot(snap=>{
        cb(snap.data())
    })
}



const getAllOrders = async ()=>{
    const db = firebase.firestore()
    const query = db.collection(ORDERS).orderBy('createdAt').limit(30)

    const snap =  await query.get()

    return snap.docs.map(doc => doc.data())
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




const getOrderByStates = (cb, states=[]) => {

    const allData = {}


    const callback = (index) => (data)=>{    
        const newData = data.docs.map(doc=>doc.data())
        allData[states[index]] = newData
        const result = Object.keys(allData).reduce((prev, state)=>{
            return [...prev, ...allData[state]]
        }, [])
        cb(result)
    }


    const db = firebase.firestore()
    const collection = db.collection(ORDERS)

    const queries = states.map(state => collection.where('state','==', state))

    const unsubscribes = queries.map((query, index) => {
        return query.onSnapshot(callback(index))
    })

    return ()=>{
        unsubscribes.forEach(unsubscribe=>{
            unsubscribe()
        })
    }
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
    getOrderByStates
}