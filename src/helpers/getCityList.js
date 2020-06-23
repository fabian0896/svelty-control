export default function(shippingRates={}){
    
    const keys = Object.keys(shippingRates)

    const cityList = keys.reduce((prev, currCurrier)=>{
        const listCurrier = shippingRates[currCurrier].reduce((prevCity, currCity)=>{
            return [...prevCity, {city: currCity.city, department: currCity.Department}]
        }, [])  

        return preventDuplicate(prev, listCurrier)//quitar las que estan repetidas que son muchas

    },[])

    return cityList

}



const preventDuplicate = (ListCurrier1, ListCurrier2)=>{
    const listNoDuplicate = ListCurrier1.reduce((prev, curr)=>{
        if(isSomeSimilar(curr, ListCurrier2)){
            return prev
        }else{
            return [...prev, curr]
        }
    }, [])

    return [...listNoDuplicate, ...ListCurrier2]
}



const isSomeSimilar = (city, listCity)=>{
    return listCity.find(elem =>{
        return (elem.city === city.city) && (elem.department === city.department)
    })
}