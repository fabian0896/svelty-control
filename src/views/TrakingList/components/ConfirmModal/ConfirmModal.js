import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/styles'

import { Typography, Modal, Paper, Divider, TextField, Avatar, Button } from '@material-ui/core'
import clsx from 'clsx'
import NumberFormatCustom from '../../../../components/NumberFormatCustom'
import {useFormik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    price: Yup.string().required()
})

const useStyles = makeStyles(theme => ({
    root: {
        width: 400,
        padding: theme.spacing(4)
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        margin: `${theme.spacing(2)}px 0px`
    },
    title: {
        margin: `${theme.spacing(1)}px 0px`
    },
    header: {
        display: 'flex',
    },
    avatarContainer: {
        marginRight: theme.spacing(2)
    },
    avatar: props => ({
        background: props.order ? props.order.color : '#EEE',
        color: theme.palette.getContrastText(props.order ? props.order.color : '#EEE')
    })
}))



const ConfirmModal = props => {
    const { className, open, onClose, order, onSave } = props

    const classes = useStyles(props)
    const formik = useFormik({
        initialValues:{
            price: 0
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions)=>{
            console.log(values)
            actions.resetForm()
            await onSave(values)
            onClose()
        }
    })

    return (
        <Modal className={clsx(className, classes.modal)} onClose={onClose} open={open}>
            {order ?
                <Paper className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.avatarContainer}>
                            <Avatar className={classes.avatar}>
                                {order.firstName.charAt(0).toUpperCase()}
                                {order.lastName.charAt(0).toUpperCase()}
                            </Avatar>
                        </div>
                        <div>
                            <Typography variant="h5">{order.firstName} {order.lastName}</Typography>
                            <Typography variant="body2">{order.city.name}({order.city.department_name})</Typography>
                        </div>
                    </div>

                    <Divider className={classes.divider} />
                    <Typography align="center" variant="h5">MP{order.mipaquete_code}</Typography>
                    <Typography variant="body2" align="center" gutterBottom>Codigo mipaquete</Typography>

                    <Typography className={classes.title} variant="body1">Que valor se cobro en la devolución?</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            error={formik.errors.price && formik.touched.price}
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                        <Divider className={classes.divider} />
                        <Button type="submit" style={{marginRight: 10}} variant="contained" color="primary">Guardar</Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </form>
                </Paper>
                :
                <Typography>No hay ninguna orden seleccionada</Typography>
            }
        </Modal>
    )
}



export default ConfirmModal


