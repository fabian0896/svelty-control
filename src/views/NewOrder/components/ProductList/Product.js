import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  Divider,
} from '@material-ui/core';
import numeral from 'numeral'

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex',
    width: "100%",
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  name: {
    flex: 2
  },
  size: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  color: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  price: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
}));



const Product = props => {
  const { className, value, ...rest } = props;

  const classes = useStyles();


  const {
    name,
    price,
    size,
    provider,
    color
  } = value



  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div className={classes.name}>
            <Typography
              variant="h5"
            >
              {name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle2"
            >
              {provider? provider: "Sin proveedor"}
            </Typography>
          </div>
          <div className={classes.size}>
            <Typography align="center" variant="h6" >{size}</Typography>
            <Typography align="center" color="textSecondary" variant="subtitle2">Talla</Typography>
          </div>
          <div className={classes.color}>
            <Typography align="center" variant="h6" >{color}</Typography>
            <Typography align="center" color="textSecondary" variant="subtitle2">Color</Typography>
          </div>
          <div className={classes.price}>
            <Typography align="right" variant="h5">{numeral(price).format('$0,0')}</Typography>
          </div>

        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  value: PropTypes.object
};

export default Product;
