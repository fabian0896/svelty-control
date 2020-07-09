import React, { Fragment } from 'react'


import NoShipping from './NoShipping'
import ShippingForm from './ShippingForm'



const ShippingInfo = props =>{
    const {order, onAddShipping} = props
  
    return(
        <Fragment>
            {
                order?
                <ShippingForm onAddShipping={onAddShipping}  order={order}/>
                :
                <NoShipping/>
            }      
        </Fragment>
    )
}




export default ShippingInfo