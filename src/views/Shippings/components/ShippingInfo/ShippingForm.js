import React from 'react'
import {makeStyles} from '@material-ui/styles'
import { 
    Card,
    CardHeader,
    Avatar,
    Divider, 
    Typography,
    CardContent,
    IconButton
} from '@material-ui/core'
import { ORDER_STATES } from 'enviroment'
import {FileCopy} from '@material-ui/icons'


const useStyles = makeStyles(theme=>({
    root:{

    },
    avatar: props => ({
        background: props.order.color,
        color: theme.palette.getContrastText(props.order.color)
    }),
    infoItem:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(.5),
        '&:hover':{
            background: theme.palette.action.hover,
            borderRadius: theme.shape.borderRadius
        },
        '& > div':{
            flex: 1
        },
        '&:hover > $copyIcon':{
            display: 'block'
        }
    },
    copyIcon:{
        display: 'none'
    }
}))



const ShippingForm = props =>{
    const {order} = props
    const classes = useStyles(props)


    return(
        <Card>
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
                subheader={ORDER_STATES[order.state].name}
            />
            <CardContent>
                <div className={classes.infoItem}>
                    <div>
                        <Typography variant="h6">{order.phone}</Typography>
                        <Typography variant="body2">Telefono</Typography>
                    </div>
                    <IconButton size="small" className={classes.copyIcon}>
                        <FileCopy/>
                    </IconButton>
                </div>
                
                <div className={classes.infoItem}>
                    <div>
                        <Typography variant="h6">{order.address}</Typography>
                        <Typography variant="body2">Dirección</Typography>
                    </div>
                    <IconButton size="small" className={classes.copyIcon}>
                        <FileCopy/>
                    </IconButton>
                </div>

                <div className={classes.infoItem}>
                    <div>
                        <Typography variant="h6">{order.email}</Typography>
                        <Typography  variant="body2">Correo</Typography>
                    </div>
                    <IconButton size="small" className={classes.copyIcon}>
                        <FileCopy/>
                    </IconButton>
                </div>

                <div className={classes.infoItem}>
                    <div>
                        <Typography variant="h6">{order.phone}</Typography>
                        <Typography variant="body2">Valor declarado</Typography>
                    </div>
                    <IconButton size="small" className={classes.copyIcon}>
                        <FileCopy/>
                    </IconButton>
                </div>
            </CardContent>
            
        </Card>
    )
}



export default ShippingForm