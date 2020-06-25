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
  const { className, product, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >

      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            FD
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
        title="Fabian David Dueñas Garcia"
        subheader="CALI(VALLE DEL CAUCA)"
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
              <Typography align="center" variant="h4">$78.000</Typography>
              <Typography align="center" variant="body1" color="textSecondary">Total</Typography>
            </div>
            <div>
              <Typography align="center" variant="h4">1</Typography>
              <Typography align="center" variant="body1" color="textSecondary">Prenda</Typography>
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
  product: PropTypes.object.isRequired
};

export default OrderCard;
