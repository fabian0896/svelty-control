import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, IconButton, TextField } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import {NumberFormatCustom} from 'components'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondaryInfo: {
        display: 'flex',
        width: '100%',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        '& > div': {
            flex: 1
        }
    },
    addButton:{
        color: theme.palette.success.main,
        fontSize: 40
    }
}))


const ProductSelect = props => {
    const { product, provider, onSetProduction } = props
    const classes = useStyles(props)


    const [price, setPrice] = useState(0)

    const handleSetProduction = ()=>{
        const providerObject = {
            name: provider.name,
            price: parseInt(price)
        }
        onSetProduction(providerObject, product.orderId, product.index, product.change)
    }


    const handleChange = (event)=>{
        setPrice(event.target.value)
        
    }

    useEffect(()=>{
        if(!provider){
            return
        }
        if(!product){
            return
        }
        const actualProduct = provider.products[product.product.id]
        if(!actualProduct){
            return
        }
        const actualPrice = actualProduct.price
        setPrice(actualPrice)
    },[product])

    return (
        <div className={classes.root}>
            <Typography align="center" variant="h2">{product && product.name}</Typography>
            <div className={classes.secondaryInfo}>
                <div>
                    <Typography align="center" variant="h3">{product && product.size}</Typography>
                    <Typography align="center" variant="subtitle2">Talla</Typography>
                </div>
                <div>
                    <Typography align="center" variant="h3">{product && product.color}</Typography>
                    <Typography align="center" variant="subtitle2">Color</Typography>
                </div>
            </div>
            <TextField
                onChange={handleChange}
                value={price}
                label="Precio por mayor"
                margin="dense"
                name="wholesalePrice"
                required
                variant="outlined"
                InputProps={{
                    inputComponent: NumberFormatCustom,
                }}
            />
            <div>
                <IconButton onClick={handleSetProduction}>
                    <AddCircle className={classes.addButton} />
                </IconButton>
            </div>
        </div>
    )
}


export default ProductSelect

