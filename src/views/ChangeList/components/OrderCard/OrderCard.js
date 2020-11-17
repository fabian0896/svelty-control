import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Avatar,
  CardHeader,
  CardActionArea,
  IconButton,
  ButtonBase
} from '@material-ui/core';

import { MoreVert } from '@material-ui/icons'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import numeral from 'numeral'
import moment from 'moment'
import { ORDER_STATES, PAYMENT_METHOD } from '../../../../enviroment'

const useStyles = makeStyles((theme) => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: props => ({
    height: 45,
    width: 45,
    background: props.order.color,
    color: theme.palette.getContrastText(props.order.color)
  }),
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(1)
  },
  resumeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    '& > div': {
      flex: 1
    }
  },
  footer: props => ({
    padding: 0,
  }),
  actionsContainer:{
    display: 'flex',
    width: "100%",
    height: "100%",
  },
  actions:{
    flex: 1,
    padding: theme.spacing(1)
  },
  positive:{
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText
  },
  negative:{
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  }
}));

const OrderCard = props => {
  const { className, order, onClick,  onOpenModal, ...rest } = props;

  const classes = useStyles(props);

  const getTotalPrice = (products = []) => {
    return products.reduce((prev, curr) => prev + curr.price, 0)
  }

  const StateIcon = ORDER_STATES[order.state].icon

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >

      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {order.firstName.charAt(0).toUpperCase()}
            {order.lastName.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
        subheaderTypographyProps={{
          variant: 'body2',
          color: 'textSecondary'
        }}
        titleTypographyProps={{
          variant: 'h5',
        }}
        title={`${order.firstName} ${order.lastName}`}
        subheader={`${order.city.name}(${order.city.department_name})`}
      />
      <Divider />
      <CardActionArea onClick={onClick}>

        <CardContent>
          <Typography  variant="h1" align="center">C{numeral(order.serialNumber).format("000")}</Typography>
          <Typography
                align="center"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
              Identificador del cambio
          </Typography>
          <div className={classes.resumeContainer}>
            <div>
              <Typography
                align="left"
                variant="body1"
              >
                {order.phone}
              </Typography>
              <Typography
                align="left"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
                Telefono
          </Typography>
            
            </div>
            <div>
              <Typography
                align="right"
                variant="body1"
              >
              {moment(order.createdAt.seconds * 1000).format('DD/MM/YYYY')}
              </Typography>
              <Typography
                align="right"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
               Fecha de creación
          </Typography>
            </div>
          </div>

      <Typography align="center" variant="h4">{order.products.length}</Typography>
      <Typography align="center" variant="body1" color="textSecondary">Prendas de cambio</Typography>

        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions className={classes.footer}>
        <div className={classes.actionsContainer}>
        <ButtonBase focusRipple className={clsx(classes.actions, classes.positive)}>
          Llego!
        </ButtonBase>
        <ButtonBase onClick={onOpenModal} focusRipple className={clsx(classes.actions, classes.negative)}>
          Cancelar
        </ButtonBase> 
        </div>
      </CardActions>
    </Card>
  );
};

OrderCard.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default OrderCard;
