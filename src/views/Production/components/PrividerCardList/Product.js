import React from 'react'
import PropsTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Typography, IconButton } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { sizes, PRODUCT_STATES } from '../../../../enviroment'
import numeral from 'numeral'
import clsx from 'clsx'


const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        '&:hover': {
            background: theme.palette.action.hover
        },
        padding: theme.spacing(1)
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
    wholesalePice: {
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
    const { product, onClickMenu } = props
    const classes = useStyle(props)
    const actualSize = sizes.find(value => value.number === parseInt(product.size))

    const ActualIcon = PRODUCT_STATES[product.state].icon
    return (
            <div className={classes.root}>
                <div className={clsx(classes[product.state], classes.iconState) }>
                    <ActualIcon color="inherit" />
                </div>

                <div className={classes.name}>
                    <Typography align="left" variant="h6">{product.name}</Typography>
                    <Typography align="left" variant="subtitle2">Prenda</Typography>
                </div>
                <div className={classes.size}>
                    <Typography align="center" variant="h6">{`${actualSize.letter}(${actualSize.number})`}</Typography>
                    <Typography align="center" variant="subtitle2">Talla</Typography>
                </div>
                <div className={classes.color}>
                    <Typography align="center" variant="h6">{product.color}</Typography>
                    <Typography align="center" variant="subtitle2">Color</Typography>
                </div>
                <div className={classes.wholesalePice}>
                    <Typography align="center" variant="h6">{product.wholesalePrice ? numeral(product.wholesalePrice).format('$0,0') : '---'}</Typography>
                    <Typography align="center" variant="subtitle2">Por mayor</Typography>
                </div>
                <div className={classes.sellPrice}>
                    <Typography align="center" variant="h6">{numeral(product.price).format('$0,0')}</Typography>
                    <Typography align="center" variant="subtitle2">Venta</Typography>
                </div>
                <div className={classes.icon}>
                    <IconButton onClick={onClickMenu(product)}>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
    )
}

Product.prototype = {
    className: PropsTypes.string,
    product: PropsTypes.object
}



export default Product

