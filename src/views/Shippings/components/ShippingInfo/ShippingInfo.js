import React, { Fragment } from 'react'


import NoShipping from './NoShipping'
import ShippingForm from './ShippingForm'



const ShippingInfo = props =>{
    const {order} = props
  
    return(
        <Fragment>
            {
                order?
                <ShippingForm  order={order}/>
                :
                <NoShipping/>
            }      
        </Fragment>
    )
}




export default ShippingInfo