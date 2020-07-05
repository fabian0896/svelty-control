import React from 'react'
import {makeStyles} from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { Block } from '@material-ui/icons'


const useStyles = makeStyles(theme=>({
    root:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
    icon:{
        width: 60,
        height: 60,
        color: theme.palette.error.main,
        marginBottom: theme.spacing(2)
    }
}))


const NoProduct = props => {
    const classes = useStyles()


    return(
        <div className={classes.root}>
            <Block className={classes.icon}/>
            <Typography align="center" variant="h4">Este proveedor no maneja esa prenda</Typography>
            <Typography align="center" variant="subtitle2">Revisa los demas proveedores ;)</Typography>
        </div>
    )
}


export default NoProduct