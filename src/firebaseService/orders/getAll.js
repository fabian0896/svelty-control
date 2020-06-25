import * as firebase from 'firebase'
import 'firebase/firestore'

const ORDERS = "orders"

export default async function(){
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
