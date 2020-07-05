import React from 'react'
import ProviderCard from './ProviderCard'



const ProviderCardList = props =>{
    const {providers, selectedProduct, onSetProduction, isSelecting, productList} = props

    return(
        <div>
            {
                providers.map((provider, index)=>(
                    <ProviderCard
                        productList={productList}
                        isSelecting={isSelecting}
                        onSetProduction={onSetProduction} 
                        selectedProduct={selectedProduct} 
                        key={index} 
                        provider={provider}/>
                ))
            }
        </div>
    )
}



export default ProviderCardList