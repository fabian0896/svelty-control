import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ClientInfo , ProducstInfo, ProductList } from './components';

import { useFormik } from 'formik'
import * as Yup from 'yup'


const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Por favor ingresa el nombre"),
  lastName: Yup.string().required("Por favor ingresa el apellido"),
  email: Yup.string().email("El correo no es valido"),
  phone: Yup.number().required("Por favor ingresa el telefono"),
  city: Yup.string().required("Por favor ingresa la ciudad"),
  address: Yup.string().required("Por favor ingresa la direción"),
  paymentMethod: Yup.string().required(),
  products: Yup.array().min(1, "El pedido debe tener por lo menos una prenda")
})



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));




const NewOrder = () => {
  const classes = useStyles();

  



  const handleSaveOrder = (values, actions)=>{
    console.log(values)
  }

  const {setFieldValue ,...formik} = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      paymentMethod: 'mipaquete',
      products: []
    },
    validationSchema: validationSchema,
    onSubmit: handleSaveOrder
  })



  const handleAddProduct = (values, actions) =>{
    const newProduct = {
      ...values,
      price: parseInt(values.price),
      provider: null,
      wholesalePrice: null,
      state: "pending"
    }
    setFieldValue("products", [...formik.values.products, newProduct])
    actions.resetForm()
  } 

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <ProducstInfo onAddProduct={handleAddProduct} />
          <ProductList products={formik.values.products} />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <ClientInfo
            formik={formik}
          />
        </Grid>
  
      </Grid>
    </div>
  );
};

export default NewOrder;
