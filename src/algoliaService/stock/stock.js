import algoliasearch from 'algoliasearch'

const client = algoliasearch('9P7M48NHP0', 'b88ec07888dacb382644c384b79fcafa')
const index = client.initIndex('stock')


const add = async ({id, name, provider, size, color}) =>{
    const algoliaObject ={
        name,
        provider,
        size,
        color,
        objectID: id
    }
    const result = await index.saveObject(algoliaObject)
    return result
}


const deleteProduct = async (id) => {
    const result = await index.deleteObject(id)
    return result
}

export default {
    add,
    deleteProduct
}