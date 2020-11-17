import React, {useState}from 'react'
import ProviderCard from './ProviderCard'
import { Menu, MenuItem } from '@material-ui/core'


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
        const {orderId, index, change} = editingProduct
        onProductReady(orderId, index, change)
        handleClose()
    }

    const handlePending = ()=>{
        const {orderId, index, change} = editingProduct
        onProductPending(orderId, index, change)
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