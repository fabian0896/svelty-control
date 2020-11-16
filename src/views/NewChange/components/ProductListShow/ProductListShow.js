import React from 'react'
import PropsTypes from 'prop-types'
import { makeStyles} from '@material-ui/styles'
import clsx from 'clsx'

import { 
    Card,
    CardHeader,
    CardContent,
    Divider,
    Typography,
} from '@material-ui/core'


import Product from './Product'


import numeral from 'numeral'



const useStyle = makeStyles(theme => ({
    root:{
        marginBottom: theme.spacing(2)
    }
}))

const ProductList = props =>{
    const {className, order}= props
    const classes = useStyle(props)


    const {products} = order

    const calculateTotal = (products) => products.reduce((prev, curr)=>prev + curr.price,0)

    return(
        <Card className={clsx(classes.root, className) }>
            <CardHeader
                title="Prendas Entregadas"
                subheader="Lista de prendas que fueron entregadas al cliente"
            />
            <Divider/>
            <CardContent>
                {
                    products.map((product, index)=>{
                        return <Product key={index} product={product}/>
                    })
                }
            </CardContent>
        </Card>
    )
}


ProductList.prototype = {
    className: PropsTypes.string,
    order: PropsTypes.object.isRequired
}


export default ProductList