import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import {
    Card,
    CardHeader,
    Divider,
    CardContent,
    Typography
} from '@material-ui/core'
import clsx from 'clsx'
import { ThumbUp } from '@material-ui/icons'
import numeral from 'numeral'

const useStyle = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    currierResume: {
        marginBottom: theme.spacing(2)
    },
    resume: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > div': {
            flex: 1
        }
    },
    payResume: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        background: theme.palette.success.main,
        borderRadius: '50%',
        color: theme.palette.success.contrastText,
        marginBottom: theme.spacing(1)
    }
}))


const ShippingDetail = props => {
    const { className, order } = props
    const classes = useStyle(props)
    const shipping = order.shipping || {}
    return (
        <Card className={clsx(className, classes.root)}>
            <CardHeader
                title="Envio"
                subheader="Informacion del envio"
            />
            <Divider />
            <CardContent>
                <div className={classes.currierResume}>
                    <Typography align="center" variant="h3">{shipping.guide_number || "---"}</Typography>
                    <Typography align="center" variant="subtitle2">{order.company_name || "No asignado"}</Typography>
                </div>
                <div className={classes.resume}>
                    <div>
                        <Typography align="center" variant="h4">{numeral(order.shipping_price || 0).format("$0,0")}</Typography>
                        <Typography align="center" variant="body2">valor del envio</Typography>
                    </div>
                    <div>
                        <Typography align="center" variant="h4">{order.paymentMethod === 'mipaquete' ? "Contra entrega" : "Consignación"}</Typography>
                        <Typography align="center" variant="body2">Modo</Typography>
                    </div>
                </div>
                {
                    order.state === "delivered" && 
                    <div className={classes.payResume}>
                        <div className={classes.icon}>
                            <ThumbUp color="inherit" />
                        </div>
                        <Typography variant="body1" align="center">El valor ya fue cobrado y esta en la cuenta</Typography>
                    </div>
                }
            </CardContent>
        </Card>
    )
}


ShippingDetail.prototype = {
    className: PropTypes.string,

}


export default ShippingDetail