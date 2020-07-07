import React from 'react'
import {makeStyles} from '@material-ui/styles'
import { Card } from '@material-ui/core'




const useStyles = makeStyles(theme => ({
    root:{

    }
}))


const ShippingInfo = props =>{
    const classes = useStyles(props)

    return(
        <Card>
            formulario de envio
        </Card>
    )
}




export default ShippingInfo