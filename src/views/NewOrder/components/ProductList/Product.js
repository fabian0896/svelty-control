import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons'
import numeral from 'numeral'

const useStyles = makeStyles(theme => ({
  root: {
    transition: '.2s',
    '&:hover':{
      background: theme.palette.primary.main
    },
    '&:hover $subtitles':{
      color: theme.palette.primary.contrastText
    },
    '&:hover $title':{
      color: theme.palette.primary.contrastText
    },
    '&:hover $size':{
      display: 'none'
    },
    '&:hover $color':{
      display: 'none'
    },
    '&:hover $price':{
      display: 'none'
    },
    '&:hover $edit':{
      display: 'flex'
    },
    '&:hover $delete':{
      display: 'flex'
    },
  },
  subtitles:{
    color: theme.palette.text.secondary,
  },
  title:{
    color: theme.palette.text.primary
  },
  details: {
    display: 'flex',
    width: "100%",
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
  },
  edit:{
    flex: 1,
    display: 'none',
    color: theme.palette.primary.contrastText,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  delete:{
    flex: 1,
    display: 'none',
    color: theme.palette.primary.contrastText,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  editting:{
    border: `2px solid ${theme.palette.primary.main}`
  }
}));



const Product = props => {
  const { className, value, onDelete, onEdit, isEditing, ...rest } = props;

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
      className={clsx(className, {[classes.editting]: isEditing, [classes.root]: !isEditing})}
    >
      <CardContent>
        <div className={classes.details}>
          <div className={classes.name}>
            <Typography
              variant="h5"
              className={classes.title}
              color="inherit"
            >
              {name}
            </Typography>
            <Typography
              className={classes.subtitles}
              color="inherit"
              variant="subtitle2"
            >
              {provider? provider: "Sin proveedor"}
            </Typography>
          </div>
          <div className={classes.size}>
            <Typography className={classes.title} color="inherit" align="center" variant="h6" >{size}</Typography>
            <Typography className={classes.subtitles} align="center" color="inherit" variant="subtitle2">Talla</Typography>
          </div>
          <div className={classes.color}>
            <Typography className={classes.title} color="inherit" align="center" variant="h6" >{color}</Typography>
            <Typography className={classes.subtitles} align="center" color="inherit" variant="subtitle2">Color</Typography>
          </div>
          <div className={classes.price}>
            <Typography className={classes.title} color="inherit" align="right" variant="h5">{numeral(price).format('$0,0')}</Typography>
          </div>
          <div className={classes.delete}>
            <IconButton onClick={onDelete} size="medium" color="inherit">
              <Delete/>
            </IconButton>
            <Typography color="inherit" variant="subtitle2">Borrar</Typography>
          </div>
          <div className={classes.edit}>
              <IconButton onClick={onEdit} size="medium" color="inherit">
                <Edit/>
              </IconButton>
              <Typography color="inherit" variant="subtitle2">Editar</Typography>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  value: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
};

export default Product;
