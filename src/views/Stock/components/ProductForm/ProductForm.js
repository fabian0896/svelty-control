import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, CardContent, Divider, TextField, Grid, Typography, IconButton, CardActions, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import clsx from 'clsx'
import { useFormik } from 'formik'

import NumberFormatCustom from '../../../../components/NumberFormatCustom'

import * as Yup from 'yup'

import { sizes } from '../../../../enviroment'


const productValidationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre de la prenda es requerido"),
    wholesalePrice: Yup.number().required("El valor de venta es requerido"),
    provider: Yup.string().required("Es necesario saber el proveedor"),
    color: Yup.string().required("El color es requerido"),
    size: Yup.number().required("Se necesita la talla"),
   
})



const useStyle = makeStyles(theme => ({
    root: {

    },
    deleteButton: {
        color: theme.palette.error.main
    }
}))


const ProductForm = props => {
    const { className, onAdd, products } = props
    const classes = useStyle(props)


    const [providerOptions, setProviderOptions] = useState([])


    const formik = useFormik({
        initialValues: {
            product: '',
            wholesalePrice: '',
            provider: '',
            color: '',
            size: '',
            stock: true,
            state: 'ready'
        },
        validationSchema: productValidationSchema,
        onSubmit: async (value, actions) => {
            await onAdd({ ...value, wholesalePrice: parseInt(value.wholesalePrice)})
            actions.resetForm()
        }
    })



    const handleChangeProductName = (event, value) =>{
        formik.setFieldValue('product', value)
        formik.setFieldValue('name', value.name)
        setProviderOptions(value.providers)
    }


    const handleChangeAutocomplete = (event, value) => {
        formik.setFieldValue('provider', value.name)
        formik.setFieldValue('wholesalePrice', value.price)
    }



    return (
        <Card className={clsx(className, classes.root)}>
            <form
                onSubmit={formik.handleSubmit}
                autoComplete="off"
                noValidate>
                <CardHeader
                    title="Agregar prenda"
                    subheader="Ingresa los datos para agregar una prenda al stock"
                />
                <Divider />
                <CardContent>

                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Autocomplete
                                autoSelect
                                autoComplete
                                fullWidth
                                onChange={handleChangeProductName}
                                options={products}
                                getOptionSelected={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => (option.name) }
                                renderInput={(params) => <TextField {...params} margin="dense" label="Prenda" variant="outlined" />}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                value={formik.values.size}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.size && formik.touched.size}
                                fullWidth
                                label="Talla"
                                margin="dense"
                                name="size"
                                required
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                variant="outlined"
                            >
                                {sizes.map(option => (
                                    <option
                                        key={option.number}
                                        value={option.number}
                                    >
                                        {`${option.letter} (${option.number})`}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <TextField
                                value={formik.values.color}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.color && formik.touched.color}
                                fullWidth
                                label="Color"
                                margin="dense"
                                name="color"
                                required
                                variant="outlined"
                            />
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                onChange={handleChangeAutocomplete}
                                name="provider"
                                fullWidth
                                getOptionSelected={(option, value) => option.name === value.name}
                                options={providerOptions}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} margin="dense" label="Proveedor" variant="outlined" />}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.wholesalePrice}
                                error={formik.errors.wholesalePrice && formik.touched.wholesalePrice}
                                fullWidth
                                label="Precio de compra"
                                margin="dense"
                                name="wholesalePrice"
                                required
                                variant="outlined"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                            />
                        </Grid>


                    </Grid>

                </CardContent>
                <CardActions>
                    <Button disabled={formik.isSubmitting} type="submit" color="primary">
                        Agregar
                    </Button>

                </CardActions>
            </form>
        </Card>
    )
}


ProductForm.prototype = {
    className: PropTypes.string
}


export default ProductForm