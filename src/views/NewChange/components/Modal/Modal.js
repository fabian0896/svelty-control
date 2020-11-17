import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography, Button, Divider, } from '@material-ui/core'
import numeral from 'numeral'



const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        margin: theme.spacing(2, 0)
    }
}));

export default function SimpleModal(props) {

    const { open, onClose, serialNumber } = props

    const classes = useStyles();

    return (


        <Modal
            className={classes.modal}
            open={open}
            onClose={onClose}
        >
            <div className={classes.paper}>
                <Typography gutterBottom variant="h4" align="center">Cambio generado correctamente!</Typography>
                <Divider className={classes.divider} />
                <Typography variant="h5" align="center">Identificador del cambio</Typography>
                <Typography variant="h1" gutterBottom align="center">C{numeral(serialNumber).format("000")}</Typography>
                <Typography variant="body2" align="center">Recuerda decirle a la clienta que ponga una nota dentro del paquete que envia con este indentificador para poder identificar el cambio en el momento en que llegue</Typography>
                <Divider className={classes.divider} />
                <Button onClick={onClose} fullWidth color="primary">ok</Button>
            </div>
        </Modal>
    );
}
