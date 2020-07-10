import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Avatar,
  CardHeader,
  CardActionArea,
  IconButton
} from '@material-ui/core';

import { CloudDownload } from '@material-ui/icons'
import { ORDER_STATES } from '../../../../enviroment'

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
  footer: props=>({
    background: ORDER_STATES[props.order.state].color,
    color: theme.palette.getContrastText(ORDER_STATES[props.order.state].color),
    padding: theme.spacing(1)
  })
}));

const OrderCard = props => {
  const { className, order, onClick, ...rest } = props;

  const classes = useStyles(props);

  const getTotalPrice = (products=[])=>{
    return products.reduce((prev, curr)=> prev + curr.price,0)
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
            <CloudDownload />
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

          <div className={classes.resumeContainer}>
            <div>
              <Typography
                align="left"
                variant="h5"
              >
                Corrdinadora
          </Typography>
              <Typography
                align="left"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
                Compañia
          </Typography>
              <Typography
                align="left"
                variant="h5"
              >
                900765463
          </Typography>
              <Typography
                align="left"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
                Guia
          </Typography>
            </div>
            <div>
              <Typography
                align="right"
                variant="h5"
              >
                4 de junio de 2020
          </Typography>
              <Typography
                align="right"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
                Fecha de envio
          </Typography>
              <Typography
                align="right"
                variant="h5"
              >
                Contra entrega
          </Typography>
              <Typography
                align="right"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
               Pago
          </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActionArea className={classes.footer}>
          <Typography align="center" color="inherit" variant="h6">Estado del pedido</Typography>
      </CardActionArea>
    </Card>
  );
};

OrderCard.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default OrderCard;
