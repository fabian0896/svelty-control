import React from 'react'
import PropsTypes from 'prop-types'
import { makeStyles} from '@material-ui/styles'

import { 
    Card,
    CardHeader,
    CardContent,
    Divider,
} from '@material-ui/core'


import Product from './Product'



const useStyle = makeStyles(theme => ({
    root:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}))

const ProductList = props =>{

    const classes = useStyle(props)

    return(
        <Card className={classes.root}>
            <CardHeader
                title="Prendas"
                subheader="Lista de prendas del pedido"
            />
            <Divider/>
            <CardContent>
                <Product/>
                <Product/>
            </CardContent>
        </Card>
    )
}


ProductList.prototype = {
    className: PropsTypes.string
}


export default ProductList