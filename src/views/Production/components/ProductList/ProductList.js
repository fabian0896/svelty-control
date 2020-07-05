import React, { useState, useEffect, Fragment } from 'react'
import Product from './Product'
import { ClickAwayListener } from '@material-ui/core'




const ProductList = props => {

    const { onSelect, productList, selected, onCancelSelect } = props

    const handleSelect = (index) => () => {
        onSelect(index)
    }

    return (
        <div>
            {
                productList.map((product, index) => {
                    if (product.state === "pending") {
                        return <Product selected={selected === index} onSelect={handleSelect(index)} product={product} key={index} />
                    }
                })
            }
        </div>
    )
}


export default ProductList