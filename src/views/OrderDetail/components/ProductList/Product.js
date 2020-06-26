import React from 'react'
import PropsTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Typography, IconButton } from '@material-ui/core'
import { MoreVert, Check } from '@material-ui/icons'



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
        color: theme.palette.success.main
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
    }
}))


const Product = props => {

    const classes = useStyle(props)
    return (
        <div className={classes.root}>
            <div className={classes.iconState}>
                <Check color="inherit" />
            </div>

            <div className={classes.name}>
                <Typography align="left" variant="h6">Cinturilla clásica 3h</Typography>
                <Typography align="left" variant="subtitle2">Fajas Internacionales</Typography>
            </div>
            <div className={classes.size}>
                <Typography align="center" variant="h6">M(34)</Typography>
                <Typography align="center" variant="subtitle2">Talla</Typography>
            </div>
            <div className={classes.color}>
                <Typography align="center" variant="h6">Negro</Typography>
                <Typography align="center" variant="subtitle2">Color</Typography>
            </div>
            <div className={classes.wholesalePice}>
                <Typography align="center" variant="h6">36.000</Typography>
                <Typography align="center" variant="subtitle2">Por mayor</Typography>
            </div>
            <div className={classes.sellPrice}>
                <Typography align="center" variant="h6">78.000</Typography>
                <Typography align="center" variant="subtitle2">Venta</Typography>
            </div>
            <div className={classes.icon}>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>
    )
}

Product.prototype = {
    className: PropsTypes.string
}



export default Product

