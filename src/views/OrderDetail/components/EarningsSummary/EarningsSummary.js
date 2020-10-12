import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Card, CardHeader, Divider, CardContent, Typography } from '@material-ui/core'
import numeral from 'numeral'

const useStyle = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    },
    item: {
        display: 'flex',
        marginBottom: theme.spacing(2)
    },
    title: {
        flex: 1
    },
    add: {
        color: theme.palette.success.main
    },
    subtract: {
        color: theme.palette.error.main
    }
}))


const EarningsSummary = props => {
    const { className, order } = props

    const classes = useStyle(props)

    const getProductsPrice = (products = []) => {
        return products.reduce((prev, curr) => prev + curr.price, 0)
    }
    const getwholesalePrice = (products = []) => {
        return products.reduce((prev, curr) => prev + curr.wholesalePrice, 0)
    }

    const getTotal = (or) => {
        return getProductsPrice(or.products) - getwholesalePrice(or.products) - (or.shipping_price || 0)
    }

    return (
        <Card className={clsx(className, classes.root)}>
            <CardHeader
                title="Ganancia"
                subheader="Resumen de ganacias del pedido"
            />
            <Divider />
            <CardContent>
                <div className={classes.item}>
                    <Typography className={classes.title} variant="h5">
                        Valor de venta
                    </Typography>
                    <Typography className={classes.add} color="inherit" variant="h5">
                        +{numeral(getProductsPrice(order.products)).format("$0,0")}
                    </Typography>
                </div>
                <div className={classes.item}>
                    <Typography className={classes.title} variant="h5">
                        Valor de las prendas
                    </Typography>
                    <Typography className={classes.subtract} color="inherit" variant="h5">
                        -{numeral(getwholesalePrice(order.products)).format("$0,0")}
                    </Typography>
                </div>
                <div className={classes.item}>
                    <Typography className={classes.title} variant="h5">
                        Envio
                    </Typography>
                    <Typography className={classes.subtract} color="inherit" variant="h5">
                        -{numeral(order.shipping_price || 0).format("$0,0")}
                    </Typography>
                </div>
                <div className={classes.resume}>
                    <Typography className={classes.add} color="inherit" align="center" variant="h3">{numeral(getTotal(order)).format("$0,0")}</Typography>
                    <Typography align="center" variant="subtitle2">Ganancia total</Typography>
                </div>
            </CardContent>
        </Card>
    )
}


EarningsSummary.prototype = {
    className: PropTypes.string
}


export default EarningsSummary