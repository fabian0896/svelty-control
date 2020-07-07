import shippingRates from '../enviroment/shippingRates.json'



export default function(location, totalValue,){

    const coordinadoraRates = shippingRates.coordinadora
    const tccRates = shippingRates.tcc

    const locationRatesCoordinadora = findLoaction(location, coordinadoraRates)
    const locationRatesTcc = findLoaction(location, tccRates)

    if(!locationRatesTcc && !locationRatesCoordinadora){
        return '---'
    }


    if(!locationRatesCoordinadora){
        return locationRatesTcc.deliveryDays
    }
    if(!locationRatesTcc){
        return locationRatesCoordinadora.deliveryDays
    }

    if(parseInt(locationRatesCoordinadora.deliveryDays) < parseInt(locationRatesTcc.deliveryDays)){
        return locationRatesCoordinadora.deliveryDays
    }else{
        return locationRatesTcc.deliveryDays
    }

}


const findLoaction = (location, rates) =>{
    if(!location){
        return null
    }
    return rates.find(elem => {
        return (elem.city === location.name) && (elem.Department === location.department_name)
    })
}