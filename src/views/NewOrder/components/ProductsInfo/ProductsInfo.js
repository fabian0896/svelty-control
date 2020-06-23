import React, {useEffect}  from 'react';
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
  TextField
} from '@material-ui/core';

import NumberFormatCustom from '../../../../components/NumberFormatCustom'

import { sizes } from '../../../../enviroment'

import {useFormik} from 'formik'
import * as Yup from 'yup'



const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es necesario"),
  size: Yup.string().required("Selecciona una talla"),
  color: Yup.string().required("El color es necesario"),
  price: Yup.string().required("El valor de venta es necesario")
})


const useStyles = makeStyles(() => ({
  root: {}
}));

const ProductsInfo = props => {
  const { className, onAddProduct, isEditing, products, ...rest } = props;

  const classes = useStyles();

  useEffect(()=>{
    if(isEditing >= 0){
      //poner los valores de la edicion em el formulario
      setValues(products[isEditing])
    }
  },[isEditing])


  const {handleChange, handleBlur, values, errors, touched, handleSubmit, setValues} = useFormik({
    initialValues:{
      name: '',
      size: '',
      color: '',
      price: ''
    },
    validationSchema: validationSchema,
    onSubmit: onAddProduct
  })
 

  


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
          subheader="Agrega Prendas al pedido"
          title="Prendas"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Prenda"
                margin="dense"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.name}
                error={errors.name && touched.name}
                helperText={errors.name}
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
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            {isEditing >= 0? "Editar" : "Agregar Prenda"}
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
