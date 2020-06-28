import React from 'react'
import Proptypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import {
    Card, Typography
} from '@material-ui/core'
import { ORDER_STATES } from '../../../../enviroment'
import moment from 'moment'


const useStyle = makeStyles(theme => ({
    root: props => ({
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        background: ORDER_STATES[props.order.state].color,
        color: theme.palette.getContrastText(ORDER_STATES[props.order.state].color),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    icon: props => ({
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.getContrastText(ORDER_STATES[props.order.state].color),
        color: ORDER_STATES[props.order.state].color,
        borderRadius: '50%',
        height: 50,
        width: 50,
        marginRight: theme.spacing(2)
    }),
    description: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}))


const OrderState = props => {
    const { className, order } = props
    const classes = useStyle(props)
    const StateIcon = ORDER_STATES[order.state].icon
    const actualState = ORDER_STATES[order.state]
    return (
        <Card className={clsx(className, classes.root)}>
            <div className={classes.icon}>
                <StateIcon color="inherit" />
            </div>
            <div className={classes.description}>
                <Typography color="inherit" align="left" variant="h4">{actualState.name}</Typography>
                <Typography color="inherit" align="left" variant="body1">{actualState.defaultMessage}</Typography>
            </div>
            <div>
                <Typography color="inherit" align="center" variant="body2">28/06/2020</Typography>
            </div>
        </Card>
    )
}




OrderState.prototype = {
    className: Proptypes.string,
    order: Proptypes.object.isRequired
}



export default OrderState