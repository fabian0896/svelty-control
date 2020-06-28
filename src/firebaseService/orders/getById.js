import * as firebase from 'firebase/app'
import 'firebase/firestore'

const ORDERS = 'orders'

export default function(id, cb){
    const db = firebase.firestore()
    return db.collection(ORDERS).doc(id).onSnapshot(snap=>{
        cb(snap.data())
    })
}