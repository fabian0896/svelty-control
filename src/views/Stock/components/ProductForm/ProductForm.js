import React, { useEffect } from 'react'
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
    price: Yup.number().required("El valor de venta es requerido"),
    providers: Yup.array().min(1, "Debe haber por lo menos 1 proveedor")
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




    const getProvidersNames = (listProducts) => {
        return listProducts.reduce((prev, curr) => {
            const currArray = curr.providers.reduce((customArray, currProvider) => {
                if (!!prev.find(elem => elem === currProvider.name)) {
                    return customArray
                } else {
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
        onSubmit: async (value, actions) => {
            await onAdd({ ...value, price: parseInt(value.price) })
            actions.resetForm()
        }
    })


    const handleChangeAutocomplete = (event, value) => {
       
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
                                fullWidth
                                options={products}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} margin="dense" label="Prenda" variant="outlined" />}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
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
                                onInputChange={handleChangeAutocomplete}
                                
                                name="name"
                                freeSolo
                                fullWidth
                                getOptionDisabled={(option) => !!formik.values.providers.find(elem => elem.name === option)}
                                getOptionSelected={(option, value) => option === value}
                                options={getProvidersNames(products)}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} margin="dense" label="Proveedor" variant="outlined" />}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Precio de compra"
                                margin="dense"
                                name="price"
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