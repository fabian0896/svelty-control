import {
    Timer,
    Warning,
    Done,
    FlightTakeoff,
    HourglassEmpty, 
    HourglassFull,
    Error as ErrorIcon
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
        color: blueGrey[100]
    },
    production:{
        name: "Prendas en producción",
        icon: HourglassEmpty,
        color: purple[300]
    },
    productReady:{
        name: "Prendas listas",
        icon: HourglassFull,
        color: lime[300]

    },
    dispatched:{
        name: "Enviado",
        icon: FlightTakeoff,
        color: cyan[700]
    },
    shippingProblems:{
        name: "Con novedades",
        icon: Warning,
        color: amber[500]
    },
    delivered:{
        name: "Entregado",
        icon: Done,
        color: green[800]
    },
    return:{
        name: "Devolución",
        icon: ErrorIcon,
        color: red[800]
    }

}