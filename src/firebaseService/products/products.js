import * as firebase from 'firebase/app'
import 'firebase/firestore'


const PRODUCTS = 'products'

const addProduct =  async (value)=>{
    const db = firebase.firestore()

    const collection = db.collection(PRODUCTS)

    const id = collection.doc().id

    const newProduct = {
        ...value,
        id,
        createdAt: new Date()
    }

    await collection.doc(id).set(newProduct)
    
    return id
}



const getAllProducts = (cb)=>{
    const db = firebase.firestore()

    const collection = db.collection(PRODUCTS)

    const unsuscribe = collection.onSnapshot((querySnapshot)=>{
        const result = querySnapshot.docs.map(item => item.data())
        cb(result)
    })

    return unsuscribe

}


export default {
    addProduct,
    getAllProducts
}