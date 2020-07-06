import React, { useState } from 'react'
import PackagingCard from './PackagingCard'



const PackagingList = props => {
    const {orders, onActionClick, loading, selectable, icon, iconColor} = props
    const [selectedCard, setSelectedCard] = useState("")

    const handleClick = (id)=>()=>{
        setSelectedCard(id)
    }

    return(
        <div>
            {
                orders.map(order=>(
                    <PackagingCard
                        iconColor={iconColor}
                        icon={icon}
                        loading={loading}
                        onActionClick={onActionClick}
                        onClick={handleClick} 
                        selected={selectable && (selectedCard === order.id)} 
                        key={order.id} 
                        order={order}/>
                ))
            }
        </div>
    )
}


export default PackagingList