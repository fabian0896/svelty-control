import React, {useState}from 'react'
import ProviderCard from './ProviderCard'
import { Menu, MenuItem } from '@material-ui/core'
import { order } from 'firebaseService/orders'


const ProviderCardList = props => {
    const { 
        providers, 
        selectedProduct, 
        onSetProduction, 
        isSelecting, 
        productList,
        onProductReady,
        onProductPending
    } = props

    const [anchorEl, setAnchorEl] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null)
    
    const handleClickMenu =(product) => (event) => {
        setAnchorEl(event.currentTarget);
        setEditingProduct(product)
      };

    const handleReady = ()=>{
        const {orderId, index} = editingProduct
        onProductReady(orderId, index)
        handleClose()
    }

    const handlePending = ()=>{
        const {orderId, index} = editingProduct
        onProductPending(orderId, index)
        handleClose()
    }

      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <div>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleReady} >Listo</MenuItem>
                <MenuItem onClick={handlePending}>Pendiente</MenuItem>
            </Menu>
            {
                providers.map((provider, index) => (
                    <ProviderCard
                        onClickMenu={handleClickMenu}
                        productList={productList}
                        isSelecting={isSelecting}
                        onSetProduction={onSetProduction}
                        selectedProduct={selectedProduct}
                        key={index}
                        provider={provider} />
                ))
            }
        </div>
    )
}



export default ProviderCardList