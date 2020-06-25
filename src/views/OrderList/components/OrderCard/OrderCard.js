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
import moment from 'moment'
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
  })
}));

const OrderCard = props => {
  const { className, order, ...rest } = props;

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
                {order.currier || "Sin asignar"}
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
                {order.trackNumber || "Sin guia"}
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
      <CardActions className={classes.footer}>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon color="inherit" className={classes.statsIcon} />
            <Typography
              color="inherit"
              display="inline"
              variant="body2"
            >
              {moment(order.createdAt.seconds*1000).format('DD/MM/YYYY')}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <StateIcon color="inherit" className={classes.statsIcon} />
            <Typography
              color="inherit"
              display="inline"
              variant="body2"
            >
              {ORDER_STATES[order.state].name}
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
