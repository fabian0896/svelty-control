import React, { Fragment, useState } from 'react'
import { Card, CardHeader, CardContent, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Product from './Product'
import { SearchInput } from 'components';





const useStyle = makeStyles(theme => ({
    root: {
        
    }
}))


const Products = props => {
    const { products, onDelete } = props
    const classes = useStyle()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedId, setSelectedId] = useState(null)
    
    const handleClick = (id) => (event) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id)
      };
    
      const handleDelete = async () =>{
          if(!selectedId){
            return
          }
          await onDelete(selectedId)
          setSelectedId(null)
          setAnchorEl(null);
          return
      }


      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <Fragment>
            <Card>
                <CardHeader
                    title="Stock"
                    subheader="Lista de prendas en stock"
                    action={
                        <SearchInput
                            placeholder="Busaca una prenda"
                        />
                    }
                />
                <CardContent>
                    {
                        products.map((product, index) =>(
                            <Product onOpenMenu={handleClick}  key={index} product={product}/>
                        ))
                    }      
                </CardContent>
            </Card>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDelete} >Eliminar</MenuItem>
            </Menu>
        </Fragment>
    )
}



export default Products

