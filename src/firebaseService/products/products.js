import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { value } from 'numeral'


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


const editProduct = async (value)=>{
    const {id} = value
    const db = firebase.firestore()

    const collection = db.collection(PRODUCTS)

    await collection.doc(id).update(value)
    return id
}   



const deleteProduct = async (id) =>{
    const db = firebase.firestore()
    const collection = db.collection(PRODUCTS)
    return await collection.doc(id).delete()
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
    getAllProducts,
    editProduct,
    deleteProduct
}