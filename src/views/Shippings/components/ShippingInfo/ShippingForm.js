import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Card,
    CardHeader,
    Avatar,
    Typography,
    CardContent,
    IconButton,
    FormControlLabel,
    Switch,
    Button,
    CardActions
} from '@material-ui/core'
import { ORDER_STATES } from 'enviroment'
import { FileCopy } from '@material-ui/icons'
import numeral from 'numeral'

import { PAYMENT_METHOD } from 'enviroment'

import CustomShipping from './CustomShipping'


const useStyles = makeStyles(theme => ({
    root: {

    },
    avatar: props => ({
        background: props.order.color,
        color: theme.palette.getContrastText(props.order.color)
    }),
    infoItem: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(.5),
        '&:hover': {
            background: theme.palette.action.hover,
            borderRadius: theme.shape.borderRadius
        },
        '& > div': {
            flex: 1
        },
        '&:hover > $copyIcon': {
            display: 'block'
        }
    },
    copyIcon: {
        display: 'none'
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    mipaquete: {
        backgroundColor: '#FFAF4B',
        opacity: .9,
        '&:hover': {
            opacity: 1,
            backgroundColor: '#FFAF4B',
        }
    }
}))



const ShippingForm = props => {
    const { order, onAddShipping } = props
    const classes = useStyles(props)


    const [mipaqueteSelect, setMipaqueteSelect] = useState(PAYMENT_METHOD[order.paymentMethod].mipaquete)



    const getTotal = (array = [], key) => {
        return array.reduce((prev, curr) => prev + parseInt(curr[key]), 0)
    }


    const copyContent = (value) => () => {
        const elem = document.createElement('input')
        elem.setAttribute('value', value)
        document.body.appendChild(elem)
        elem.select()
        document.execCommand('copy')
        document.body.removeChild(elem)
    }


    const handleChangeSwitch = (event) => {
        setMipaqueteSelect(event.target.checked)
    }


    return (
        <Card>
            <CardHeader
                action={
                    <FormControlLabel
                        disabled={!PAYMENT_METHOD[order.paymentMethod].customShipping}
                        control={<Switch onChange={handleChangeSwitch} checked={mipaqueteSelect} color="primary" />}
                        label="Mipaquete"
                        labelPlacement="bottom"
                    />
                }
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
                        <Typography variant="h6">{order.city.name}({order.city.department_name})</Typography>
                        <Typography variant="body2">Ciudad</Typography>
                    </div>
                    <IconButton onClick={copyContent(order.city.name)} size="small" className={classes.copyIcon}>
                        <FileCopy />
                    </IconButton>
                </div>
                <div className={classes.infoItem}>
                    <div>
                        <Typography variant="h6">{order.phone}</Typography>
                        <Typography variant="body2">Telefono</Typography>
                    </div>
                    <IconButton onClick={copyContent(order.phone)} size="small" className={classes.copyIcon}>
                        <FileCopy />
                    </IconButton>
                </div>

                <div className={classes.infoItem}>
                    <div>
                        <Typography variant="h6">{order.address}</Typography>
                        <Typography variant="body2">Dirección</Typography>
                    </div>
                    <IconButton onClick={copyContent(order.address)} size="small" className={classes.copyIcon}>
                        <FileCopy />
                    </IconButton>
                </div>

                <div className={classes.infoItem}>
                    <div>
                        <Typography variant="h6">{order.email}</Typography>
                        <Typography variant="body2">Correo</Typography>
                    </div>
                    <IconButton onClick={copyContent(order.email)} size="small" className={classes.copyIcon}>
                        <FileCopy />
                    </IconButton>
                </div>

                <div className={classes.infoItem}>
                    <div>
                        <Typography variant="h6">{numeral(getTotal(order.products, 'wholesalePrice')).format('$0,0')}</Typography>
                        <Typography variant="body2">Valor declarado</Typography>
                    </div>
                    <IconButton onClick={copyContent(getTotal(order.products, 'wholesalePrice'))} size="small" className={classes.copyIcon}>
                        <FileCopy />
                    </IconButton>
                </div>
                <div className={classes.infoItem}>
                    <div>
                        <Typography align="center" variant="h4">{numeral(getTotal(order.products, 'price')).format('$0,0')}</Typography>
                        <Typography align="center" variant="body2">Valor venta</Typography>
                    </div>
                    <IconButton onClick={copyContent(getTotal(order.products, 'price'))} size="small" className={classes.copyIcon}>
                        <FileCopy />
                    </IconButton>
                </div>
            </CardContent>
            {
                mipaqueteSelect ?
                    <CardActions>
                        <Button
                            fullWidth
                            onClick={onAddShipping}
                            variant="contained"
                            className={classes.mipaquete}
                            color="inherit"
                            startIcon={<img height={35} alt="logo-mipaquete" src="/images/logo-mi-paquete-blanco-nuevo.png" />}
                        >
                        </Button>
                    </CardActions>
                    :
                    <CustomShipping />
            }

        </Card>
    )
}



export default ShippingForm