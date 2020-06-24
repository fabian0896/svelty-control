import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const ORDERS = 'orders'

export default async function(value){

    const user = firebase.auth().currentUser
    const db = firebase.firestore()



    const order = {
        ...value,
        state: "pending",
        createdAt: new Date(),
        creatorId: user.uid,
        creatorName: user.displayName
    }

    const result = await db.collection(ORDERS).add(order)

    return result.id
}