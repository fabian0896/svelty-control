import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';

import { Autocomplete } from '@material-ui/lab'

import numeral from 'numeral'
import shippingRates from '../../../../enviroment/shippingRates.json'
import colombiaCities from '../../../../enviroment/colombiaCities.json'
import { getCityList, calculateShippingDays } from '../../../../helpers'



const useStyles = makeStyles(() => ({
  root: {},
  resumeContainer: {
    display: 'flex',
    '& > div': {
      flex: 1
    }
  }
}));

const ClientInfo = props => {
  const {
    className,
    formik,
    ...rest
  } = props;


  const [cityOptions, setCityOptions] = useState(() => [])
  const [deliveryDays, setDeliveryDays] = useState(() => "---")

  const { handleChange, handleBlur, touched, values, errors, handleSubmit, isValid, setFieldValue, isSubmitting } = formik

  const classes = useStyles()


  const getTotal = (list = []) => {
    return list.reduce((prev, curr) => {
      return prev + curr.price
    }, 0)
  }


  useEffect(() => {
    const data = getCityList(shippingRates)
    setCityOptions(data)
  }, [])


  const handleAutocompleteChange = (e, value) => {
    setFieldValue("city", value)
    const days = calculateShippingDays(value)
    setDeliveryDays(days)
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader="Agregue los datos generales del pedido"
          title="Información general"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={errors.firstName}
                label="Nombre"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.firstName}
                error={errors.firstName && touched.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={errors.lastName}
                label="Apellido"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.lastName}
                error={errors.lastName && touched.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={errors.email}
                label="Correo electronico"
                margin="dense"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email && touched.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={errors.phone}
                label="Numero de telefono"
                margin="dense"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                value={values.phone}
                error={errors.phone && touched.phone}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={errors.paymentMethod}
                label="Medio de pago"
                margin="dense"
                name="paymentMethod"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.paymentMethod && touched.paymentMethod}
                value={values.paymentMethod}
                variant="outlined"
                select
                SelectProps={{ native: true }}
              >
                <option value="mipaquete">Pago contra entrega</option>
                <option value="consignment">Consignación</option>
                <option value="cash">Efectivo</option>
              </TextField>
            </Grid>


            <Grid
              item
              md={6}
              xs={12}>
              <Autocomplete
                fullWidth
                getOptionSelected={(option, value) => {
                  return (option.city === value.city) && (option.department === value.department)
                }}
                value={values.city}
                onChange={handleAutocompleteChange}
                options={values.paymentMethod === "mipaquete" ? cityOptions : colombiaCities}
                getOptionLabel={(option) => `${option.city}(${option.department})`}
                renderInput={(params) => <TextField {...params} autoComplete="off" label="Destino" margin="dense" variant="outlined" />}
              />
            </Grid>



            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={errors.address}
                label="Dirección"
                margin="dense"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                error={errors.address && touched.address}
                value={values.address}
                variant="outlined"
              />


            </Grid>





            <Grid item md={12}>
              <Divider />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <div className={classes.resumeContainer}>
                <div>
                  <Typography align="center" variant="h1">{numeral(getTotal(values.products)).format('$0,0')}</Typography>
                  <Typography align="center" variant="subtitle1" color="textSecondary">total</Typography>
                </div>
                <div>
                  <Typography align="center" variant="h1">{values.products.length}</Typography>
                  <Typography align="center" variant="subtitle1" color="textSecondary">{values.products.length > 1 ? "Prendas" : "Prenda"}</Typography>
                </div>
                <div>
                  <Typography align="center" variant="h1">{values.paymentMethod === 'mipaquete' ? deliveryDays : '---'}</Typography>
                  <Typography align="center" variant="subtitle1" color="textSecondary">Dias de envio</Typography>
                </div>
              </div>
            </Grid>


          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            disabled={!isValid || isSubmitting}
            color="primary"
            variant="contained"
            type="submit"
          >
            Guardar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ClientInfo.propTypes = {
  className: PropTypes.string,
  formik: PropTypes.object.isRequired
};

export default ClientInfo;