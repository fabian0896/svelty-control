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
  IconButton
} from '@material-ui/core';

import { MoreVert } from '@material-ui/icons'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import numeral from 'numeral'

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    height: 45,
    width: 45
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
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
  }
}));

const OrderCard = props => {
  const { className, order, ...rest } = props;

  const classes = useStyles();

  const getTotalPrice = (products=[])=>{
    return products.reduce((prev, curr)=> prev + curr.price,0)
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
        subheader={`${order.city.city}(${order.city.department})`}
      />
      <Divider />
      <CardActionArea>

        <CardContent>

          <div className={classes.resumeContainer}>
            <div>
              <Typography
                align="left"
                variant="body1"
              >
                3217378301
          </Typography>
              <Typography
                align="left"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
                Telefono
          </Typography>
              <Typography
                align="left"
                variant="body1"
              >
                Contra entrega
          </Typography>
              <Typography
                align="left"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
                Medio de pago
          </Typography>
            </div>
            <div>
              <Typography
                align="right"
                variant="body1"
              >
                Coordinadora
          </Typography>
              <Typography
                align="right"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
                Medio de envio
          </Typography>
              <Typography
                align="right"
                variant="body1"
              >
                98130530799
          </Typography>
              <Typography
                align="right"
                variant="body1"
                gutterBottom
                color="textSecondary"
              >
               Guia
          </Typography>
            </div>
          </div>




          <div className={classes.resumeContainer}>
            <div>
      <Typography align="center" variant="h4">{numeral(getTotalPrice(order.products)).format('$0,0')}</Typography>
              <Typography align="center" variant="body1" color="textSecondary">Total</Typography>
            </div>
            <div>
      <Typography align="center" variant="h4">{order.products.length}</Typography>
      <Typography align="center" variant="body1" color="textSecondary">{order.products.length === 1? "prenda" : "Prendas"}</Typography>
            </div>
          </div>


        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              24 de Junio de 2020
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Enviado
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

OrderCard.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object.isRequired
};

export default OrderCard;
