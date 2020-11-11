import React, { useEffect, useState } from 'react'
import Product from './Product'
import { makeStyles} from '@material-ui/styles'


const useStyles = makeStyles(theme => ({
    root:{
        overflow: 'auto'
    }
}))

const ProductionProductList = props => {
    const { provider, productList, onClickMenu } = props

    const [list, setList] = useState([])
    const classes = useStyles()

    useEffect(() => {
        const data = productList.filter(product => ((product.state === 'production') && (product.provider === provider.name)))
        setList(data)
    }, [productList])

    return (
        <div className={classes.root}>
            {
                list.map((product, index) => (
                    <Product onClickMenu={onClickMenu} product={product} key={index} />
                ))
            }
        </div>
    )
}



export default ProductionProductList







