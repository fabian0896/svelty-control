import * as firebase from 'firebase/app'
import 'firebase/firestore'


const STOCK = "stock"



const addProduct =  async (value) =>{
    const db = firebase.firestore()
    const collection = db.collection(STOCK)

    const id =  collection.doc().id

    const newProduct ={
        ...value,
        id,
        createdAt: new Date()
    }

    await collection.doc(id).set(newProduct)

    return id

}





export default {
    addProduct
}