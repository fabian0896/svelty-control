import * as firebase from 'firebase/app'
import 'firebase/firestore'
import _ from 'lodash'

const CHANGES = "changes"
const ORDERS = 'orders'

const addChange = async (change, order)=>{
    const db = firebase.firestore()
    const changeId = db.collection(CHANGES).doc().id

    const serialNumber = await getSerial()

    await db.collection(CHANGES).doc(changeId).set({
        ...change,
        id: changeId,
        orderId: order.id,
        createdAt: new Date(),
        arrive: false, 
        state: "pending",
        serialNumber,
        color: order.color,
        change: true,
        withShipping: false
    })

    await db.collection(ORDERS).doc(order.id).update({
        changes: firebase.firestore.FieldValue.arrayUnion(changeId)
    })

    return serialNumber
}




const deleteChange = async (changeId) => {
    const db = firebase.firestore()
    const doc = db.collection(CHANGES).doc(changeId)

    const snap = await doc.get()
    const data = snap.data()

    await db.collection(ORDERS).doc(data.orderId).update({
        changes: firebase.firestore.FieldValue.arrayRemove(changeId)
    })

    await doc.delete()
}


const getChangesNotArrive = (cb)=>{
    const db = firebase.firestore()
    return db.collection(CHANGES).where("arrive", "==", false).onSnapshot((snap)=>{
        const data = snap.docs.map(v => v.data())
        cb(data)
    })
}


const getSerial = async () =>{
    const doc = firebase.firestore().collection("serials").doc("changes")
    const snap = await doc.get()
    const {number} = snap.data()

    await doc.update({
        number: firebase.firestore.FieldValue.increment(1)
    })

    return number
}


const setArriveChange = async (changeId) =>{
    const db = firebase.firestore()
    const doc = db.collection(CHANGES).doc(changeId)
    await doc.update({
        arrive: true
    })
}


const getArrivedChanges = async ()=>{
    const db = firebase.firestore()
    const snap = await db.collection(CHANGES).where("arrive", "==", true).get()
    const data = snap.docs.map(v => v.data())
    return data
}



const getProductionChanges = (cb)=>{

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
    const collection = db.collection(CHANGES)
    const queryPending = collection.where('state','==', 'pending').where("arrive", "==", true)
    const queryProduction = collection.where('state','==', 'production').where("arrive", "==", true)

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
    const orderRef = db.collection(CHANGES).doc(orderId)

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
    const collection = db.collection(CHANGES)

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




//----------------------------------------------------

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

const newShippingToOrder = async (order, mipaquete=true, shippingData)=>{
    const db = firebase.firestore()
    const doc = db.collection(CHANGES).doc(order.id)
    
    let updatObject = {}

   
    updatObject = {
        withShipping: true,
        mipaquete: false,
        collection_date: 0,
        guide_number: shippingData.guide_number,
        company_name: shippingData.company_name,
        shipping_price: parseInt(shippingData.price),
        state: "delivered"
    }

    //tambien hay que actualizar algolia con el numero de guia y el codigo de mipaquete si tiene
    await doc.update(updatObject)

    return
}


export default {
    addChange,
    deleteChange,
    getChangesNotArrive,
    setArriveChange,
    getArrivedChanges,
    getProductionChanges,
    setProductState,
    getOrderByStates,
    newShippingToOrder
}