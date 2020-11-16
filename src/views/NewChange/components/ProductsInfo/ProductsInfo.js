import React, { useEffect, useState, Fragment } from 'react';
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
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'
import NumberFormatCustom from '../../../../components/NumberFormatCustom'

import { sizes } from '../../../../enviroment'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { StockList } from '../'



const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es necesario"),
  size: Yup.string().required("Selecciona una talla"),
  color: Yup.string().required("El color es necesario"),
  product: Yup.object().required()
})


const useStyles = makeStyles(() => ({
  root: {}
}));

const ProductsInfo = props => {
  const { 
    className, 
    onAddProduct, 
    isEditing, 
    products, 
    stock,
    productList, 
    ...rest } = props;

  const classes = useStyles();

  const [withStock, setWithStock] = useState(false)


  useEffect(() => {
    if (isEditing >= 0) {
      //poner los valores de la edicion em el formulario
      setValues(products[isEditing])
    }
  }, [isEditing])


  const { handleChange, handleBlur, values, errors, touched, handleSubmit, setValues, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      size: '',
      color: '',
      product: null
    },
    validationSchema: validationSchema,
    onSubmit: onAddProduct(withStock)
  })


  const handleChangeWithStock = (event) => {
    setWithStock(event.target.checked)
  }


  const handleChangeProduct = (event, value)=>{
    if(value){
      setFieldValue('name', value.name)
      setFieldValue('product', value)
    }else{
      setFieldValue('name', '')
      setFieldValue('product', null)
    }
  }

  const handleStockSelect = (stockProduct)=>{
    setFieldValue('price', stockProduct.product.price)
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
          subheader="Agrega las prendas de cambio del pedido"
          title="Prendas De Cambio"
          action={
            <FormControlLabel
              control={<Switch onChange={handleChangeWithStock} color="primary" />}
              label="En stock"
              labelPlacement="bottom"
            />
          }
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {
              withStock ?
                <Grid item xs={12}>
                  <StockList
                    onSelected={handleStockSelect} 
                    setValues={setValues} 
                    stock={stock} />
                </Grid>
                :
                <Fragment>

                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <Autocomplete
                      fullWidth
                      autoSelect
                      getOptionSelected={(option, value) => {
                        return (option.id === value.id)
                      }}
                      onChange={handleChangeProduct}
                      options={productList}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) =>( 
                        <TextField 
                          {...params} 
                          autoComplete="off" 
                          label="Prenda" 
                          margin="dense" 
                          variant="outlined"
                          error={errors.name && touched.name}
                          helperText={touched.name && errors.name} />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Talla"
                      margin="dense"
                      name="size"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      value={values.size}
                      error={errors.size && touched.size}
                      helperText={errors.size}
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
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Color"
                      margin="dense"
                      name="color"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      value={values.color}
                      error={errors.color && touched.color}
                      helperText={errors.color}
                      variant="outlined"
                    />
                  </Grid>
                </Fragment>
            }
             {
              /*
            <Grid
              item
              md={12}
              xs={12}
            >
           
              <TextField
                fullWidth
                label="Precio de venta"
                margin="dense"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.price}
                error={errors.price && touched.price}
                helperText={errors.price}
                variant="outlined"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            
            </Grid>
             */ 
          }
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            {isEditing >= 0 ? "Editar" : "Agregar Prenda"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ProductsInfo.propTypes = {
  className: PropTypes.string,
  onAddProduct: PropTypes.func,
  isEditing: PropTypes.number,
  products: PropTypes.array
};

export default ProductsInfo;
