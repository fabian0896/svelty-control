import React, {useState} from 'react'
import {makeStyles} from '@material-ui/styles'
import Product from './Product'

const useStyles = makeStyles(theme => ({
    root:{
        height: 250,
        overflow: 'auto'
    }
}))


const StockList = props => {
    const {stock, setValues} = props
    const classes = useStyles(props)
    
    const [selectedStock, setSelectedStock] = useState({})


    const handleSelectedSetock = (value)=>()=>{
        console.log(value)
        setSelectedStock(value)
        setValues(value)
    }

    return(
        <div className={classes.root}>
            {
                stock.map(product=>(
                    <Product
                        onClick={handleSelectedSetock(product)}
                        selected={selectedStock.id === product.id} 
                        key={product.id} 
                        product={product} />
                ))
            }
        </div>
    )
}





export default StockList