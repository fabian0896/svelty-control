import {
    Timer,
    Warning,
    Done,
    FlightTakeoff,
    HourglassEmpty, 
    HourglassFull,
    Error as ErrorIcon,
    Check
} from '@material-ui/icons'

import {
    red,
    green,
    amber,
    blueGrey,
    cyan,
    lime,
    purple
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
        name: "Contra entrega"
    },
    consignment:{
        name: "Consignación"
    },
    cash:{
        name: "Efectivo"
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
        defaultMessage: "Todas las prendas del pedido estan listas. A la espera de ser enviadas"

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