import algoliasearch from 'algoliasearch'

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


export default {
    add
}