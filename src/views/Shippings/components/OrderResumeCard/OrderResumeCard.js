import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, Divider, CardContent, Typography, Avatar, CardActionArea } from '@material-ui/core'

import { PAYMENT_METHOD, ORDER_STATES } from 'enviroment'
import numeral from 'numeral'
import moment from 'moment'
import clsx from 'clsx'



const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2),
        cursor: 'pointer'
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
    }),
    divider:{

    },
    selected:{
        border: `3px solid ${theme.palette.primary.main}`,
        background: theme.palette.primary.light,
        '&  $footer':{
            background: theme.palette.primary.main
        },
        '& $divider':{
            border: `1px solid ${theme.palette.primary.light}`
        },
        '& $avatar':{
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }
    }
}))



const OrderResumeCard = props => {
    const { order, selected, onSelect  } = props
    const classes = useStyles(props)

    const getTotal = (productList) => {
        return productList.reduce((prev, curr) => prev + parseInt(curr.price),0)
    }

    return (
        <Card onClick={onSelect} className={clsx(classes.root, {[classes.selected]: selected})}>
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
            <Divider className={classes.divider} />
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