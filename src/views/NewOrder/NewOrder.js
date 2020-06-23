import React, {useState} from 'react';
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
  city: Yup.object().required("Selecciona un destion"),
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

  
  const [editingProduct, setEditingProduct] = useState(()=> -1)



  const handleSaveOrder = (values, actions)=>{
    console.log(values)
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: {
        city: "CALI",
        department: "VALLE DEL CAUCA"
      },
      address: '',
      paymentMethod: 'mipaquete',
      products: []
    },
    validationSchema: validationSchema,
    onSubmit: handleSaveOrder
  })



  const handleAddProduct = (values, actions) =>{
    
    let newArray = [...formik.values.products]
    
    const newProduct = {
      ...values,
      price: parseInt(values.price),
      provider: null,
      wholesalePrice: null,
      state: "pending",
      stock: false
    }

    if(editingProduct >= 0){ //se esta editando una prenda
        newArray[editingProduct] = newProduct
    }else{
      newArray = [...newArray, newProduct]
    }

    formik.setFieldValue("products", newArray)
    setEditingProduct(-1)
    actions.resetForm()
  } 


  const handleDeleteProduct = (index) => () =>{
      const newArray = [...formik.values.products]
      newArray.splice(index,1)
      formik.setFieldValue("products", [...newArray])
  }

  const handleEdit = (index)=>()=>{
    setEditingProduct(index)
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
          <ProducstInfo
            products={formik.values.products}
            isEditing={editingProduct}
            onAddProduct={handleAddProduct} />
          <ProductList
            isEditing={editingProduct}
            onEdit={handleEdit}
            onDelete={handleDeleteProduct} 
            products={formik.values.products} />
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
