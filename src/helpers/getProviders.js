export default (listProducts) => {
    return listProducts.reduce((prev, curr)=>{
        const currArray = curr.providers.reduce((customArray, currProvider)=>{
            if(!!prev.find(elem=> elem === currProvider.name)){
                return customArray
            }else{
                return [...customArray, currProvider.name]
            }
        }, [])
        return [...prev, ...currArray]
    }, [])
}