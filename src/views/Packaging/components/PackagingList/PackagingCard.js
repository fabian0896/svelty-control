import React from 'react'
import {makeStyles, Card, CardHeader, Divider, CardContent, IconButton, Avatar, CircularProgress} from '@material-ui/core'
import {ThumbUpOutlined} from '@material-ui/icons'
import Product from './Product'
import clsx from 'clsx'

const useStyles = makeStyles(theme=>({
    root:{
        marginBottom: theme.spacing(2),
        cursor: 'pointer',
    },
    checkIcon:props => ({
        color: theme.palette[props.iconColor].main
    }),
    avatar: props=>({
        background: props.order.color,
        color: theme.palette.getContrastText(props.order.color)
    }),
    select:{
        border: `3px solid ${theme.palette.primary.main}`,
    },
}))

const PackagingCard = props=>{
    const {order, selected, onClick, onActionClick, loading, icon, iconColor} = props
    const classes = useStyles(props)

    return(
        <Card onClick={onClick(order.id)} className={clsx(classes.root, {[classes.select]: selected})}>
            <CardHeader
                subheaderTypographyProps={{
                    variant: 'body2',
                    color: 'textSecondary'
                  }}
                  titleTypographyProps={{
                    variant: 'h4',
                  }}
                avatar={
                    <Avatar className={classes.avatar}>
                        {order.firstName.charAt(0).toUpperCase()}
                        {order.lastName.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={`${order.firstName} ${order.lastName}`}
                subheader={`${order.city.city}(${order.city.department})`}
                action={
                    loading === order.id?
                    <CircularProgress/>
                    :
                    <IconButton onClick={onActionClick(order.id)} className={classes.checkIcon}>
                        {icon}
                    </IconButton>
                }
            />
            <Divider/>
            <CardContent>
                {
                    order.products.map((product, index)=>(
                        <Product key={index} product={product}/>
                    ))
                }
            </CardContent>
        </Card>
    )
}


export default PackagingCard


