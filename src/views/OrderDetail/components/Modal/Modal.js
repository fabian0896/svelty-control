import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles'

import { Typography, Modal, Paper, Divider, TextField, Avatar, Button } from '@material-ui/core'
import clsx from 'clsx'
import NumberFormatCustom from '../../../../components/NumberFormatCustom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    value: Yup.string().required(),
    description: Yup.string().required(),
})

const useStyles = makeStyles(theme => ({
    root: {
        width: 400,
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
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(3)
    },
    content: {
        padding: theme.spacing(3)
    },
    avatarContainer: {
        marginRight: theme.spacing(2)
    },
    input: {
        marginBottom: theme.spacing(2)
    },
    avatar: props => ({
        background: props.order ? props.order.color : '#EEE',
        color: theme.palette.getContrastText(props.order ? props.order.color : '#EEE')
    })
}))



const ConfirmModal = props => {
    const { className, open } = props

    const [focused, setFocused] = useState(false)

    const classes = useStyles(props)
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            value: 0,
            date: moment(),
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            actions.resetForm()
            await onSave({
                ...values, 
                type, 
                value: parseInt(values.value)
            })
            onClose()
        }
    })

    const handleChangeDate = (date) => {
        formik.setFieldValue("date", date)
    }




    return (
        <Modal className={clsx(className, classes.modal)} onClose={onClose} open={open}>

            <Paper className={classes.root}>
                <div className={classes.header}>
                    <Typography color="inherit" variant="h3">Nuevo cambio</Typography>
                    <Typography color="inherit" variant="body1">Completa los datos para agregar un cambio al pedido</Typography>
                </div>

                <div className={classes.content}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            className={classes.input}
                            error={formik.errors.title && formik.touched.title}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            label="Titulo"
                            margin="dense"
                            name="title"
                            required
                            variant="outlined"
                        />
                        <TextField
                            className={classes.input}
                            error={formik.errors.description && formik.touched.description}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            label="Descripción"
                            margin="dense"
                            name="description"
                            required
                            variant="outlined"
                        />
                        <TextField
                            className={classes.input}
                            error={formik.errors.value && formik.touched.value}
                            value={formik.values.value}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            label="Dalor"
                            margin="dense"
                            name="value"
                            required
                            variant="outlined"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        />
                        <SingleDatePicker
                            openDirection="up"
                            numberOfMonths={1}
                            date={formik.values.date} // momentPropTypes.momentObj or null
                            onDateChange={handleChangeDate} // PropTypes.func.isRequired
                            focused={focused} // PropTypes.bool
                            onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
                            id="your_unique_id" // PropTypes.string.isRequired,
                            isOutsideRange={() => false}
                        />
                        <Divider className={classes.divider} />
                        <Button type="submit" style={{ marginRight: 10 }} variant="contained" color="primary">Guardar</Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </form>
                </div>
            </Paper>

        </Modal>
    )
}



export default ConfirmModal


