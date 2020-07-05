import React, { useState, useEffect, Fragment } from 'react'

import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, Avatar, Divider, CardContent } from '@material-ui/core'
import NoProduct from './NoProduct'
import ProductSelect from './ProductSelect'
import ProductionProductList from './ProdiccionProductList'

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    content:{
        height: 250
    }
}))

const ProviderCard = props => {
    const {provider, selectedProduct, onSetProduction, isSelecting, productList, onClickMenu} = props
    const classes = useStyles(props)


    const [product, setProduct] = useState(null)

    useEffect(()=>{
        if(selectedProduct){
            setProduct(provider.products[selectedProduct.product.id])
        }else{
            setProduct(null)
        }
    },[selectedProduct])

    return (
        <Card className={classes.root}>
            <CardHeader
                subheaderTypographyProps={{
                    variant: 'body2',
                    color: 'textSecondary'
                }}
                titleTypographyProps={{
                    variant: 'h5',
                }}
                title={provider.name}
                subheader={`Lista de prendas en produccion de ${provider.name}`} 
                avatar={
                    <Avatar>
                        {provider.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
            />
            <Divider />
            <CardContent className={classes.content}>
                {product? 
                    <ProductSelect
                        provider={provider}
                        onSetProduction={onSetProduction}
                        product={selectedProduct}
                     />
                : 
                <Fragment>
                    {
                        isSelecting?
                        <NoProduct/>
                        :
                        <ProductionProductList onClickMenu={onClickMenu} provider={provider} productList={productList}/>
                    }
                </Fragment>
                    
                }
            </CardContent>
        </Card>
    )
}



export default ProviderCard