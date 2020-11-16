import * as firebase from 'firebase/app'
import 'firebase/firestore'

const PROFITS = "profits"


const addProfit = async (values) =>{
    const db = firebase.firestore()
    const collection = db.collection(PROFITS)

    const profitId = collection.doc().id


    await collection.doc(profitId).set({
        ...values,
        date: values.date.toDate(),
        id: profitId
    })
    
    return
}


const getProfitsByDate = async (startDate, endDate )=>{
    const db = firebase.firestore().collection(PROFITS)

    const query = db.where('date', '>=', startDate.toDate()).where('date', '<=', endDate.toDate())
    const snap = await query.get()
    const data = snap.docs.map(v => v.data())

   return data

}


export default {
    addProfit,
    getProfitsByDate
}