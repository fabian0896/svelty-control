import React from 'react'
import {makeStyles, Card, CardHeader, Divider, CardContent, IconButton, Avatar, CircularProgress, CardActionArea, Typography} from '@material-ui/core'
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
    footer:{
        padding: theme.spacing(1),
        
    },
    packed:{
        background: theme.palette.success.main,
        color: theme.palette.success.contrastText
    },
    productReady:{
        background: theme.palette.warning.main,
        color: theme.palette.warning.contrastText
    }
}))

const PackagingCard = props=>{
    const {order, selected, onClick, onActionClick, loading, icon} = props
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
                subheader={`${order.city.name}(${order.city.department_name})`}
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
            <CardActionArea className={clsx(classes.footer, classes[order.state])}>
            <Typography color="inherit" align="center" variant="h6">{order.state === 'productReady'? 'Pendiente por empacar':'Empacado y listo para enviar!'}</Typography>
            </CardActionArea>
        </Card>
    )
}


export default PackagingCard


