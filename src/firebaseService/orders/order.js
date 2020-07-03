import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { orders as algoliaOrders } from '../../algoliaService'
import {getRandomColor} from '../../helpers'

const ORDERS = 'orders'

const addOrder = async (value)=>{

    const user = firebase.auth().currentUser
    const db = firebase.firestore()

    const orderId =  db.collection(ORDERS).doc().id

    const color = getRandomColor()

    const order = {
        id: orderId,
        ...value,
        state: "pending",
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
    const first = db.collection(ORDERS).orderBy('createdAt').limit(2)

    const documentSnap = await first.get()

    const dataResult = documentSnap.docs.map(value=>{
        return value.data()
    })

    let lastVisible = documentSnap.docs[documentSnap.docs.length - 1]

    async function nextFunction(){
        const nextSnap = await db.collection(ORDERS).orderBy('createdAt').startAfter(lastVisible).limit(2).get()
        lastVisible = nextSnap.docs[nextSnap.docs.length - 1]
        return nextSnap.docs.map(doc=>doc.data())
    }

    return [dataResult, nextFunction]
}




export default {
    addOrder,
    getOrderById,
    getAllOrders
}