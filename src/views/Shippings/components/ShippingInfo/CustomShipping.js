import React, { Fragment } from 'react'
import { CardContent, CardActions, Button, TextField, Grid } from '@material-ui/core'
import { NumberFormatCustom } from 'components'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const validationSchema = Yup.object().shape({
    company_name: Yup.string().required(),
    guide_number: Yup.string().required(),
    price: Yup.number().min(0).required()
})

const CustomShipping = props => {
    const {onAddShipping} = props
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            company_name: '',
            guide_number: '',
            price: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values, actios)=>{
            onAddShipping(false)(values)
            actios.resetForm()
        }
    })

    return (
        <Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={values.company_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.company_name && touched.company_name}
                                name="company_name"
                                variant="outlined"
                                margin="dense"
                                label="Empresa"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={values.guide_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.guide_number && touched.guide_number}
                                name="guide_number"
                                variant="outlined"
                                margin="dense"
                                label="Guia"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.price && touched.price}
                                name="price"
                                variant="outlined"
                                margin="dense"
                                label="Valor del envio"
                                fullWidth
                                required
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Guardar envio
                    </Button>
                </CardActions>
            </form>
        </Fragment>
    )
}




export default CustomShipping