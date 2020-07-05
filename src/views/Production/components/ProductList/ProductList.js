import React, { useState, useEffect } from 'react'
import Product from './Product'




const ProductList = props =>{

    const {onSelect, productList, selected, } = props

    const handleSelect = (index) => () =>{
        onSelect(index)
    }

    return(
        <div>
            {
                productList.map((product,index)=>{
                    if(product.state === "pending"){
                        return <Product selected={selected === index} onSelect={handleSelect(index)} product={product} key={index} />
                    }     
                })
            }
        </div>
    )
}


export default ProductList