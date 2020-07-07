import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, Divider, CardContent, Typography, Avatar, CardActionArea } from '@material-ui/core'

import { PAYMENT_METHOD, ORDER_STATES } from 'enviroment'
import numeral from 'numeral'
import moment from 'moment'



const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > div': {
            flex: 1
        }
    },
    footer: {
        padding: theme.spacing(1),
        background: theme.palette.info.main,
        color: theme.palette.info.contrastText
    },
    avatar: props => ({
        background: props.order.color,
        color: theme.palette.getContrastText(props.order.color)
    })
}))



const OrderResumeCard = props => {
    const { order } = props
    const classes = useStyles(props)

    const getTotal = (productList) => {
        return productList.reduce((prev, curr) => prev + parseInt(curr.price),0)
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {order.firstName.charAt(0).toUpperCase()}
                        {order.lastName.charAt(0).toUpperCase()}
                    </Avatar>
                }
                subheaderTypographyProps={{
                    variant: 'body2',
                    color: 'textSecondary'
                }}
                titleTypographyProps={{
                    variant: 'h5',
                }}
                title={`${order.firstName} ${order.lastName}`}
                subheader={`${order.city.name} ${order.city.department_name}`}
            />
            <Divider />
            <CardContent>
                <div className={classes.content}>
                    <div>
                        <Typography align="center" variant="h4">{numeral(getTotal(order.products)).format('$0,0')}</Typography>
                        <Typography align="center" variant="subtitle2">Valor de venta</Typography>
                    </div>
                    <div>
                        <Typography align="center" variant="h4">{order.products.length}</Typography>
                        <Typography align="center" variant="subtitle2">{order.products.length === 1 ? 'Prenda' : 'Prendas'}</Typography>
                    </div>
                    <div>
            <Typography align="center" variant="h4">{moment(order.createdAt.seconds *1000).fromNow()}</Typography>
                        <Typography align="center" variant="subtitle2">creación</Typography>
                    </div>
                </div>
            </CardContent>
            <CardActionArea className={classes.footer}>
                <Typography color="inherit" align="center" variant="h5">{PAYMENT_METHOD[order.paymentMethod].name}</Typography>
            </CardActionArea>
        </Card>
    )
}

export default OrderResumeCard