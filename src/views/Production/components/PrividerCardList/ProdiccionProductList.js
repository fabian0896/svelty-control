import React, { useEffect, useState } from 'react'
import Product from './Product'


const ProductionProductList = props => {
    const { provider, productList } = props

    const [list, setList] = useState([])

    useEffect(() => {
        const data = productList.filter(product => ((product.state === 'production') && (product.provider === provider.name)))
        setList(data)
    }, [productList])

    return (
        <div>
            {
                list.map((product, index) => (
                    <Product product={product} key={index} />
                ))
            }
        </div>
    )
}



export default ProductionProductList







