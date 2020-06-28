import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/styles'
import { Card, CardHeader, CardContent, Divider, TextField } from '@material-ui/core'
import clsx from 'clsx'
import {useFormik} from 'formik'





const useStyle = makeStyles(theme=>({
    root:{

    }
}))


const ProductForm = props =>{
    const {className} = props
    const classes = useStyle(props)

    const formik = useFormik({
        initialValues:{
            name: '',
            value: '',
            wholesalePrices: {}
        }
    })


    return(
        <Card className={clsx(className, classes.root)}>
            <CardHeader
                title="Nueva Prenda"
                subheader="Ingresa los datos para agregar una prenda"
            />
            <Divider/>
            <CardContent>
                <form autoComplete="off">
                    <TextField
                        variant="outlined"
                        label="Nombre"
                        fullWidth
                        
                    />
                </form>
            </CardContent>
        </Card>
    )
}


ProductForm.prototype = {
    className: PropTypes.string
}


export default ProductForm