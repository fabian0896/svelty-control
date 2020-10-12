import React, { Fragment } from 'react';
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
import { ORDER_STATES, PAYMENT_METHOD, MIPAQUETE_STATES } from '../../../../enviroment'
import moment from 'moment'

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
  }),
  positiveBottom:{
    background: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    padding: theme.spacing(1)
  },
  negativeBottom:{
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    padding: theme.spacing(1)
  },
  actions:{
    display: 'flex',
    '& > *':{
      flex: 1
    }
  }
}));


const OrderCard = props => {
  const { 
    className, 
    order, 
    onClick,
    onDispatched,
    onDelivered, 
    ...rest 
  } = props;

  const classes = useStyles(props);

  
  const handleDownloadGuide = ()=>{
      if(order.company_name === "COORDINADORA"){
        const link = document.createElement('a')
        link.href = order.shipping.RelacionEnvioDwonloadPdf
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }else if (order.company_name === "TCC"){
        const link1 = document.createElement('a')
        const link2 = document.createElement('a')
        link1.href = order.shipping.RelacionEnvioDwonloadPdf
        link2.href = order.shipping.RotulosDwonloadPdf
        link1.target = "_blank"
        link2.target = "_blank"
        console.log(link1, link2)
        document.body.appendChild(link1)
        document.body.appendChild(link2)
        link1.click()
        link2.click()
        document.body.removeChild(link1)
        document.body.removeChild(link2)
      }
  }


  const handleCancelShipping = ()=>{
    console.log("Cancelado")
  }

  const handleDispatchedShipping = async ()=>{
    await onDispatched()
    console.log("despachado")
  }

  const handleReturnShipping = ()=>{
    console.log("Devolución")
  }

  const handleDeliveredShipping = async ()=>{
    await onDelivered()
    console.log("Entregado")
  }

  const actions = {
    dispatched:{
      positiveMessage: "Entregado",
      NegativeMessage: "Devolución",
      positiveCb: handleDeliveredShipping,
      negativeCb: handleReturnShipping
    },
    productReady:{
      positiveMessage: "Enviado",
      NegativeMessage: "Cancelado",
      positiveCb: handleDispatchedShipping,
      negativeCb: handleCancelShipping
    },
    packed:{
      positiveMessage: "Enviado",
      NegativeMessage: "Cancelado",
      positiveCb: handleDispatchedShipping,
      negativeCb: handleCancelShipping
    }
  }


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
          <Fragment>
            {
              order.mipaquete &&
              <IconButton onClick={handleDownloadGuide}>
                <CloudDownload  />
              </IconButton>
            }
          </Fragment>
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
          <Typography align="center" variant="h5">MP{order.mipaquete_code}</Typography>
      <Typography align="center" variant="subtitle2">{MIPAQUETE_STATES[order.shipping.state]?MIPAQUETE_STATES[order.shipping.state].name : '---'}</Typography>

          <div className={classes.resumeContainer}>
            <div>
              <Typography
                align="left"
                variant="h6"
              >
                {order.company_name? order.company_name : 'Sin asignar'}
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
                variant="h6"
              >
                {order.guide_number? order.guide_number: 'Sin asignar'}
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
                variant="h6"
              >
                {moment(order.collection_date).format('DD [de] MMMM [del] YYYY')}
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
                variant="h6"
              >
                {PAYMENT_METHOD[order.paymentMethod].name}
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
      <div className={classes.actions}>
        <CardActionArea onClick={actions[order.state].positiveCb} className={classes.positiveBottom}>
          <Typography align="center" color="inherit" variant="h6">{actions[order.state].positiveMessage}</Typography>
        </CardActionArea>
        <CardActionArea onClick={actions[order.state].negativeCb} className={classes.negativeBottom}>
      <Typography align="center" color="inherit" variant="h6">{actions[order.state].NegativeMessage}</Typography>
        </CardActionArea>
      </div>
    </Card>
  );
};

OrderCard.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default OrderCard;
