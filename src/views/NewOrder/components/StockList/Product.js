import React from 'react'
import PropsTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Typography, IconButton } from '@material-ui/core'
import { sizes, PRODUCT_STATES } from '../../../../enviroment'
import numeral from 'numeral'
import clsx from 'clsx'
import {Add} from '@material-ui/icons'


const useStyle = makeStyles(theme => ({
    root: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        '&:hover': {
            background: theme.palette.action.hover
        },
        padding: theme.spacing(1)
    },
    selected:{
        border: `2px solid ${theme.palette.primary.main}`
    },
    icon: {
        flex: 1,
        color: theme.palette.info.main
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
    const { product, onClick, selected } = props
    const classes = useStyle(props)
    const actualSize = sizes.find(value => value.number === parseInt(product.size))

    //const ActualIcon = PRODUCT_STATES[product.state].icon
    return (
        <div onClick={onClick} className={clsx(classes.root,{[classes.selected]: selected}) }>
            
            <div className={classes.name}>
                <Typography align="left" variant="h6">{product.name}</Typography>
                <Typography align="left" variant="subtitle2">{product.provider ? product.provider : 'Sin proveedor'}</Typography>
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
        </div>
    )
}

Product.prototype = {
    className: PropsTypes.string,
    product: PropsTypes.object
}



export default Product

