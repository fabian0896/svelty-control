import {
    Timer,
    Warning,
    Done,
    FlightTakeoff,
    HourglassEmpty, 
    HourglassFull,
    Error as ErrorIcon,
    Check,
    AllInbox
} from '@material-ui/icons'

import {
    red,
    green,
    amber,
    blueGrey,
    cyan,
    lime,
    purple,
    teal
} from '@material-ui/core/colors'

export const sizes = [
    {
        letter: "2XS",
        number: 28
    },
    {
        letter: "XS",
        number: 30
    },
    {
        letter: "S",
        number: 32
    },
    {
        letter: "M",
        number: 34
    },
    {
        letter: "L",
        number: 36
    },
    {
        letter: "XL",
        number: 38
    },
    {
        letter: "2XL",
        number: 40
    },
    {
        letter: "3XL",
        number: 42
    },
    {
        letter: "4XL",
        number: 44
    },
    {
        letter: "5XL",
        number: 46
    },
    {
        letter: "6XL",
        number: 48
    },
    {
        letter: "7XL",
        number: 50
    },
]

export const PAYMENT_METHOD = {
    mipaquete:{
        name: "Contra entrega",
        mipaquete: true,
        special_service: 2, // pago contra entrega en mipaquete
        payment_type: 5, //el pago se descuenta del valor recaudado,
        customShipping: false
    },
    consignment:{ // falta ajustar los valores para los envios que ya van pagos(Faltan datos en la documentación)
        name: "Consignación", 
        mipaquete: true,
        special_service: 2, // Fala
        payment_type: 5, //el pago se descuenta del valor recaudado
        customShipping: true
    },
    cash:{
        name: "Efectivo",
        mipaquete: false,
        customShipping: false
    }
}


export const MIPAQUETE_STATES ={
    pendiente_confirmar_por_transportadora:{
        name: "Envio pendiente por confirmar",
        internalState: null
    },
    confirmado_por_transportadora:{
        name: "Confirmado por la transportadora",
        internalState: null
    },
    vehiculo_asignado:{
        name: "Vehiculo asignado",
        internalState: null
    },
    recogido_por_transportadora:{
        name: "Envio recogido por la transportadora",
        internalState: "dispatched"
    },
    enviado_a_destino:{
        name: "Envio en camino a destino",
        internalState: "dispatched"
    },
    entregado_a_destino:{
        name: "Entregado",
        internalState: "delivered"
    },
    devuelto:{
        name: "Devolucion al remitente",
        internalState: "return"
    },
    cancelado_por_el_usuario:{
        name: "Envio cancelado",
        internalState: null
    }

}



export const ORDER_STATES ={
    pending:{
        name: "Pendiente",
        icon: Timer,
        color: blueGrey[100],
        defaultMessage: "El pedido fue a gregado pero las prendas no estan listas"
    },
    production:{
        name: "Prendas en producción",
        icon: HourglassEmpty,
        color: purple[300],
        defaultMessage: "Las prendas fuerón enviadas a producción"
    },
    productReady:{
        name: "Prendas listas",
        icon: HourglassFull,
        color: lime[300],
        defaultMessage: "Todas las prendas del pedido estan listas y listas para ser empacadas"

    },
    packed:{
        name: "Empacado",
        icon: AllInbox,
        color: teal[800],
        defaultMessage: "Todas las prendas del pedido estan empacadas y listas para eviarse!"
    },
    dispatched:{
        name: "Enviado",
        icon: FlightTakeoff,
        color: cyan[700],
        defaultMessage: "El pedido fue despachado"
    },
    shippingProblems:{
        name: "Con novedades",
        icon: Warning,
        color: amber[500],
        defaultMessage: "Se presento una novedad en el envio, hay que revisar la guia"
    },
    delivered:{
        name: "Entregado",
        icon: Done,
        color: green[800],
        defaultMessage: "El pedido fue entregado en el destino. Vamos que vamos!!!"
    },
    return:{
        name: "Devolución",
        icon: ErrorIcon,
        color: red[800],
        defaultMessage: "El pedido no pudo ser entregado y lo devolvieron :("
    }

}

export const PRODUCT_STATES = {
    pending:{
        name: 'Pendiente',
        icon: Timer
    },
    production:{
        name: "Producción",
        icon: HourglassEmpty
    },
    ready:{
        name: "Lista",
        icon: Check
    }
}



