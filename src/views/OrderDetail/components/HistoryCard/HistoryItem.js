import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { ORDER_STATES } from '../../../../enviroment'

import {
    Typography
} from '@material-ui/core'

const useStyle = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        '&:last-child':{
            marginBottom: 0
        }
    },
    icon: props => ({
        marginRight: theme.spacing(2),
        background: ORDER_STATES['delivered'].color,
        padding: theme.spacing(1),
        height: 40,
        width: 40,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            color: theme.palette.getContrastText(ORDER_STATES['delivered'].color)
        }
    }),
    description: {
        flex: 1,
        marginRight: theme.spacing(2)
    },
    date: {

    }
}))



const HistoryItem = props => {

    const classes = useStyle(props)

    const StateIcon = ORDER_STATES['delivered'].icon

    return (
        <div className={classes.root}>
            <div className={classes.icon}>
                <StateIcon />
            </div>
            <div className={classes.description}>
                <Typography variant="body1">
                    Novedade en el envio
                </Typography>
                <Typography variant="body2">
                    El cliente se nego a recibir el pedido, el paquete este en terminal de destino
                </Typography>
            </div>
            <div className={classes.date}>
                <Typography color="textPrimary" variant="body2">
                    10/24/2020
                </Typography>
            </div>
        </div>
    )
}


HistoryItem.prototype = {
    className: PropTypes.string
}


export default HistoryItem