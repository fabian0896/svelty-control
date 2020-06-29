import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, CardContent, Divider, TextField, Grid, Typography, IconButton, CardActions, Button } from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import clsx from 'clsx'
import { useFormik } from 'formik'

import NumberFormatCustom from '../../../../components/NumberFormatCustom'
import { Add } from '@material-ui/icons'

import ProviderList from './ProviderList'


import * as Yup from 'yup'


const productValidationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre de la prenda es requerido"),
    price: Yup.number().required("El valor de venta es requerido"),
    providers: Yup.array().min(1, "Debe haber por lo menos 1 proveedor")
})



const useStyle = makeStyles(theme => ({
    root: {

    }
}))


const ProductForm = props => {
    const { className, onAdd, products} = props
    const classes = useStyle(props)

    const getProvidersNames = (listProducts) => {
        return listProducts.reduce((prev, curr)=>{
            const currArray = curr.providers.reduce((customArray, currProvider)=>{
                if(!!prev.find(elem=> elem === currProvider.name)){
                    return customArray
                }else{
                    return [...customArray, currProvider.name]
                }
            }, [])
            return [...prev, ...currArray]
        }, [])
    }




    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            providers: []
        },
        validationSchema: productValidationSchema,
        onSubmit: async (value, actions)=>{
            await onAdd({...value, price: parseInt(value.price)})
            actions.resetForm()
        }
    })


    const handleAddProvider = (value, actions) => {
        const newProvider = {
            ...value,
            price: parseInt(value.price)
        }
        formik.setFieldValue('providers', [...formik.values.providers, newProvider])
        actions.resetForm()
    }

    const handleRemuveProvider = (index) => () => {
        const newArray = [...formik.values.providers]
        newArray.splice(index, 1)
        formik.setFieldValue('providers', newArray)
    }


    const handleChangeAutocomplete = (event, value) => {
        providerForm.setFieldValue('name', value)
    }


    const providerForm = useFormik({
        initialValues: {
            name: '',
            price: ''
        },
        onSubmit: handleAddProvider
    })


    return (
        <Card className={clsx(className, classes.root)}>
            <form
                onSubmit={formik.handleSubmit}
                autoComplete="off"
                noValidate>
                <CardHeader
                    title="Nueva Prenda"
                    subheader="Ingresa los datos para agregar una prenda"
                />
                <Divider />
                <CardContent>

                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <TextField
                                error={formik.errors.name && formik.touched.name}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                name="name"
                                variant="outlined"
                                label="Nombre"
                                fullWidth
                                margin="dense"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={formik.errors.price && formik.touched.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                name="price"
                                fullWidth
                                label="Precio de venta"
                                margin="dense"
                                name="price"
                                required
                                variant="outlined"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography align="center" variant="h4">Valor al por mayor</Typography>
                        </Grid>



                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                onInputChange={handleChangeAutocomplete}
                                value={providerForm.values.name}
                                name="name"
                                freeSolo
                                fullWidth
                                getOptionDisabled={(option)=> !!formik.values.providers.find(elem => elem.name === option)}
                                getOptionSelected={(option, value)=> option === value}
                                options={getProvidersNames(products)}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} margin="dense" label="Proveedor" variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                onChange={providerForm.handleChange}
                                value={providerForm.values.price}
                                fullWidth
                                label="Precio"
                                margin="dense"
                                name="price"
                                required
                                variant="outlined"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <IconButton onClick={providerForm.submitForm}>
                                <Add />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <ProviderList onDelete={handleRemuveProvider} providers={formik.values.providers} />
                        </Grid>

                    </Grid>



                </CardContent>
                <CardActions>
                    <Button disabled={formik.isSubmitting} type="submit" color="primary">Guardar</Button>
                </CardActions>
            </form>
        </Card>
    )
}


ProductForm.prototype = {
    className: PropTypes.string
}


export default ProductForm