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
  nameLetter: props => ({
    height: 70,
    width: 70,
    marginLeft: 'auto',
    background: props.order.color,
    color: theme.palette.getContrastText(props.order.color)
  }),
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const ClientProfile = props => {
  const { className, order, onDeleteOrder, ...rest } = props;

  const classes = useStyles(props);



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
              {order.firstName} {order.lastName}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {`${order.city.name}(${order.city.department_name})`}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment(order.createdAt.seconds * 1000).format('DD [de] MMMM [del] YYYY')}
            </Typography>
          </div>
          <Avatar className={classes.nameLetter}>
            {order.firstName.charAt(0)}{order.lastName.charAt(0)}
          </Avatar>
        </div>

        <Divider className={classes.divider} />
        <div>
          <Typography variant="h5">{order.phone}</Typography>
          <Typography gutterBottom variant="subtitle2">Telefono</Typography>

          <Typography variant="h5">{order.address}</Typography>
          <Typography gutterBottom variant="subtitle2">Dirección</Typography>

          <Typography variant="h5">{order.email ? order.email : '---'}</Typography>
          <Typography gutterBottom variant="subtitle2">Correo electronico</Typography>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={onDeleteOrder}
        >
          Eliminar
        </Button>
        <Button variant="text">Editar</Button>
      </CardActions>
    </Card>
  );
};

ClientProfile.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object
};

export default ClientProfile;
