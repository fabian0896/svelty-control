import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  nameLetter:{
    height: 80,
    width: 80,
    marginLeft: 'auto'
  },
  divider:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const ClientProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();



  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h3"
            >
              Fabian David Dueñas Garcia
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              CALI(VALLE DEL CAUCA)
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              24 de Junio de 2020
            </Typography>
          </div>
          <Avatar className={classes.nameLetter}>
              FD
          </Avatar>
        </div>
  
        <Divider className={classes.divider}/>
        <div>
          <Typography variant="h5">3217378301</Typography>
          <Typography gutterBottom variant="subtitle2">Telefono</Typography>
          
          <Typography variant="h5">Crr 23B # 4 - 09 Barrio Miraflores</Typography>
          <Typography gutterBottom variant="subtitle2">Dirección</Typography>

          <Typography variant="h5">Fabian0896@outlook.com</Typography>
          <Typography gutterBottom variant="subtitle2">Correo electronico</Typography>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Eliminar
        </Button>
        <Button variant="text">Editar</Button>
      </CardActions>
    </Card>
  );
};

ClientProfile.propTypes = {
  className: PropTypes.string
};

export default ClientProfile;
