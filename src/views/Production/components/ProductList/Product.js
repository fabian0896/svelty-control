import React from 'react'
import PropsTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Typography, IconButton, Card } from '@material-ui/core'
import { MoreVert, Check } from '@material-ui/icons'
import { sizes, PRODUCT_STATES } from '../../../../enviroment'
import numeral from 'numeral'
import clsx from 'clsx'


const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1.5),
        '&:hover': {
            background: theme.palette.action.hover
        },
        padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`
    },
    icon: {
        flex: 1
    },
    iconState: {
        flex: 1,
    },
    name: {
        flex: 5
    },
    size: {
        flex: 2
    },
    color: {
        flex: 2
    },
    price: {
        flex: 2
    },
    sellPrice: {
        flex: 2
    },
    pending:{
        color: theme.palette.info.main
    },
    production:{
        color: theme.palette.warning.main
    },
    ready:{
        color: theme.palette.success.main
    }
}))


const Product = props => {
    const { product, onOpenMenu } = props
    const classes = useStyle(props)
    //const actualSize = sizes.find(value => value.number === parseInt(product.size))

    //const ActualIcon = PRODUCT_STATES[product.state].icon
    return (
        <Card className={classes.root}>
            <div className={clsx(classes.iconState) }>
                <Check color="inherit" />
            </div>

            <div className={classes.name}>
                <Typography align="left" variant="h6">Cinturilla clasica 3 hileras</Typography>
                <Typography align="left" variant="subtitle2">Prenda</Typography>
            </div>
            <div className={classes.size}>
                <Typography align="center" variant="h6">M(34)</Typography>
                <Typography align="center" variant="subtitle2">Talla</Typography>
            </div>
            <div className={classes.color}>
                <Typography align="center" variant="h6">Negro</Typography>
                <Typography align="center" variant="subtitle2">Color</Typography>
            </div>
            <div className={classes.price}>
                <Typography align="center" variant="h6">$78.000</Typography>
                <Typography align="center" variant="subtitle2">venta</Typography>
            </div>
           
        </Card>
    )
}

Product.prototype = {
    className: PropsTypes.string,
    product: PropsTypes.object
}



export default Product
