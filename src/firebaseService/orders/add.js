import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import { orders as algoliaOrders } from '../../algoliaService'
import {getRandomColor} from '../../helpers'

const ORDERS = 'orders'

export default async function(value){

    const user = firebase.auth().currentUser
    const db = firebase.firestore()

    const orderId =  db.collection(ORDERS).doc().id

    const color = await getRandomColor()

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