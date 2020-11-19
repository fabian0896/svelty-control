import algoliasearch from 'algoliasearch'

import {orderService} from 'firebaseService'

const client = algoliasearch('9P7M48NHP0', 'b88ec07888dacb382644c384b79fcafa')
const index = client.initIndex('orders')


const add = async ({firstName, lastName, phone, city, id}) =>{
    const algoliaObject ={
        firstName,
        lastName,
        phone,
        city: city.city,
        department: city.department,
        objectID: id
    }
    const result = await index.saveObject(algoliaObject)
    return result
}


const deleteOrder = async(ObjectID)=>{
    const result = await index.deleteObject(ObjectID)
    return result
}


const findOrder = async (query) =>{
    const hits = await index.search(query)

    const ids = hits.hits.map(v => v.objectID)

    const promises = ids.map(id => orderService.getOrderByIdPromise(id))
    
    const data = await Promise.all(promises)

    return data
}

export default {
    add,
    findOrder,
    deleteOrder,
}