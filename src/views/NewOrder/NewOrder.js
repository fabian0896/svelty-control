import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Backdrop, CircularProgress } from '@material-ui/core';

import { ClientInfo, ProducstInfo, ProductList, StockList } from './components';

import { useFormik } from 'formik'
import * as Yup from 'yup'

import * as orders from '../../firebaseService/orders'

import { useHistory } from 'react-router-dom'
import { productService, stockService, orderService } from 'firebaseService'




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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));




const NewOrder = () => {
  const classes = useStyles();


  const [editingProduct, setEditingProduct] = useState(() => -1)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [stock, setStock] = useState([])
  const [stockData, setStockData] = useState([])
  const history = useHistory()


  const handleSaveOrder = async (values, actions) => {
    console.log("se va a gregar")
    setLoading(true)
    await orderService.addOrder(values)
    setLoading(false)
    console.log("se agrego")
    history.push({ pathname: '/pedidos' })
    return
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



  const handleAddProduct = (withStock) => (values, actions) => {

    let newArray = [...formik.values.products]

    let newProduct = {
      ...values,
      price: parseInt(values.price),
      provider: null,
      wholesalePrice: null,
      state: "pending",
      stock: false
    }

    if (withStock) {
      newProduct = {
        ...values,
        price: parseInt(values.price),
      }
      const index = stock.findIndex(stockProduct => stockProduct.id === newProduct.id)
      const newStockArray = [...stock]
      newStockArray.splice(index, 1)
      setStock(newStockArray)
    }

    if (editingProduct >= 0) { //se esta editando una prenda
      newArray[editingProduct] = newProduct
    } else {
      newArray = [...newArray, newProduct]
    }

    formik.setFieldValue("products", newArray)
    setEditingProduct(-1)
    actions.resetForm()
  }


  const handleDeleteProduct = (index) => () => {
    const actualProduct = formik.values.products[index]
    if (actualProduct.stock) {
      delete actualProduct.price
      setStock(value => [...value, actualProduct])
    }
    const newArray = [...formik.values.products]
    newArray.splice(index, 1)
    formik.setFieldValue("products", [...newArray])
  }

  const handleEdit = (index) => () => {
    setEditingProduct(index)
  }



  useEffect(() => {
    const productsUnsuscribe = productService.getAllProducts((data) => {
      setProducts(data)
    })

    const stockUnsuscribe = stockService.getAllProducts((data) => {

      setStockData(data)
    })

    return () => {
      stockUnsuscribe()
      productsUnsuscribe()
    }
  }, [])


  useEffect(() => {
    let temArray = [...stockData]

    formik.values.products.filter(product => product.stock).forEach((myProduct) => {
      const index = temArray.findIndex(value => value.id === myProduct.id)
      if (index >= 0) {
        temArray.splice(index, 1)
      } else {
        //significa que se borro la prendade stock y toca quitarla de los products actuales
        const newArray = [...formik.values.products]
        const deleteIndex = newArray.findIndex(value => value.id === myProduct.id)
        newArray.splice(deleteIndex, 1)
        formik.setFieldValue('products', newArray)
      }
    })
    setStock(temArray)
  }, [stockData])


  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
            stock={stock}
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
