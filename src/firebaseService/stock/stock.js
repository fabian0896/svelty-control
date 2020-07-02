import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { stock as stockAgolia} from 'algoliaService'


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
    await stockAgolia.add({id,...newProduct})
    await collection.doc(id).set(newProduct)

    return id

}


const deleteProduct = async (id)=>{
    const db = firebase.firestore()
    const collection = db.collection(STOCK)
    await stockAgolia.deleteProduct(id)
    return await collection.doc(id).delete()
}


const getAllProducts = (cb) =>{
    const db = firebase.firestore()
    const collection = db.collection(STOCK)

    const unsuscribe = collection.onSnapshot((snap)=>{
        const data = snap.docs.map(doc => doc.data())
        cb(data)
    })

    return unsuscribe
}



export default {
    addProduct,
    getAllProducts,
    deleteProduct
}