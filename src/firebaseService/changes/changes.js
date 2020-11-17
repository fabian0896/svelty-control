import * as firebase from 'firebase/app'
import 'firebase/firestore'


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
        change: true
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



export default {
    addChange,
    deleteChange,
    getChangesNotArrive,
    setArriveChange,
    getArrivedChanges
}