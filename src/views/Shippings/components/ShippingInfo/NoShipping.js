import React from 'react'
import {makeStyles} from '@material-ui/styles'
import { Typography, Card } from '@material-ui/core'
import { Forward} from '@material-ui/icons'



const useStyles = makeStyles(theme=>({
    root:{
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 250
    },
    icon:{
        marginTop: theme.spacing(3),
        fontSize: 60
    }
}))



const NoShipping = props =>{
    const classes = useStyles(props)
    return(
        <Card className={classes.root}>
            <Typography align="center" variant="h3">Seleccione un pedido</Typography>
            <Typography align="center" variant="subtitle2">Seleccone un pedido para añadir la información de envio</Typography>
            <Forward className={classes.icon}/>
        </Card>
    )
}


export default  NoShipping