
import { PAYMENT_METHOD } from 'enviroment'
import numeral from 'numeral'


// END POINT principal de la api
const URL = "https://ecommerce.mipaquete.com/api/"

const SENDINGS = "sendings/"
const AUTH = "auth/"
const SENDINGS_TYPE = "sendings-type/"




//ESTADOS DE ENVIO

//COORDINADORA
//ENTREGADA = el paquete ya se entrego en destino
//EN REPARTO = el paquete esta en reparto
//EN TERMINAL DESTINO = el paquete llego a la ciudad de destino
//EN TERMINAL ORIGEN = el paquete ya lo tiene la transportadora

//TCC
//Envío entregado al destinatario = el envio ya fue entregado


// datos para hacer el login en la api
const USER = {
    email: "jaime_5316@hotmail.com",
    password: "sveltyfajas"
}



// datos de la persona que envia el pedido
const SENDER = {
    name: "Jaime andres",
    surname: "Riascos",
    phone: 3843400,
    cell_phone: 3117405652,
    email: "jaime_5316@hotmail.com",
    collection_address: "CALLE 34 # 94-39 ,CASA C10, RESERVAS DEL LILI",
    nit: "1143862639"
}



//Id de la ciudad de origen (CALI)
const ORIGIN = "5aa1bc55b63d79e54e7da72e"



//datos donde consignan la plata 
const COLLECTION_INFORMATION = {
    bank: "Bancolombia",
    type_account: "A",
    number_account: "83658086131",
    name_beneficiary: "JAIME ANDRES RIASCOS RIASCOS",
    number_beneficiary: 1143862639
}




const getToken = async (user) => {
    const { email, password } = user
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

    const urlencoded = new URLSearchParams()
    urlencoded.append("email", email)
    urlencoded.append("password", password)

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    }

    const res = await fetch(`${URL}${AUTH}`, requestOptions)
    const data = await res.json()
    return data.token
}



const createShipping = async (order) => {

    const token = await getToken(USER)

    const myHeaders = new Headers()
    myHeaders.append("Authorization", token)
    myHeaders.append("Content-Type", "application/json")


    const totalWholesalePrice = getTotalOfProduct(order.products, 'wholesalePrice')
    const totalPrice = getTotalOfProduct(order.products, 'price')
    const destiny = order.city._id
    const comments = numeral(totalPrice).format('$0,0')

    const receiver = {
        "name": order.firstName,
        "surname": order.lastName,
        "phone": order.phone,
        "cell_phone": order.phone,
        "email": order.email,
        "destination_address": order.address
    }


    let shippingData = {}

    if(order.paymentMethod === 'mipaquete'){
        shippingData = {
            "type": 2,
            "weight": 1,
            "declared_value": totalWholesalePrice,
            "sender": SENDER,
            "receiver": receiver,
            "origin": ORIGIN,
            "destiny": destiny,
            "quantity": 1,
            "comments": comments,
            "special_service": PAYMENT_METHOD[order.paymentMethod].special_service,
            "payment_type": PAYMENT_METHOD[order.paymentMethod].payment_type,
            "collection_information": COLLECTION_INFORMATION,
            "value_collection": totalPrice,
            "alternative": 3
        }
    }else{
        shippingData = {
            "type": 2,
            "weight": 1,
            "declared_value": totalWholesalePrice,
            "sender": SENDER,
            "receiver": receiver,
            "origin": ORIGIN,
            "destiny": destiny,
            "quantity": 1,
            "comments": comments,
            "special_service": PAYMENT_METHOD[order.paymentMethod].special_service,
            "payment_type": PAYMENT_METHOD[order.paymentMethod].payment_type,
            "collection_information": COLLECTION_INFORMATION,     
            "alternative": 3
        }
    }


    const raw = JSON.stringify(shippingData)


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const res = await fetch(`${URL}${SENDINGS_TYPE}`, requestOptions)
    const data = await res.json()

    console.log(data)

    return data.result.sending
    //Datos importantes
    //_id: el id del envio se usa para hacer la consulta del envio mas adelante
    //code: El codigo mipaquete se usa para mas adelante saber que pedidos han pagado y cuales no
    //delivery_days: horas en que se entrega el paquete (aproximado)
    //price: el valor total del envio, se tiene que agregar al pedido

}



const getShippingById = async (id) => {

    const token = await getToken(USER)


    const myHeaders = new Headers()
    myHeaders.append("Authorization", token)

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }

    const res = await fetch(`${URL}${SENDINGS}get/${id}`, requestOptions)
    const data = await res.json()

    return data.result
    //para saber si el pedido ya se depacho se puede verficar el campo pickup
    //si tiene collection_date es que ya se despacho, el problema es que al parecer
    //este valor se actualiza cada dia
}







//-------------------------------------------------------------------------------

const getTotalOfProduct = (productList = [], key) => {
    return productList.reduce((prev, curr) => prev + parseInt(curr[key]), 0)
}

export default {
    getToken,
    createShipping,
    getShippingById
}