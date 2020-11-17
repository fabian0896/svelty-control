import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Button} from '@material-ui/core';

import { SearchInput } from 'components';

import { useFormik } from 'formik'
import {
  ShoppingCart as ShoppingCartIcon,
  SwapVert as SwapVertIcon
} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: 0
  },
  exportButton: {
    marginRight: 0
  },
  buttonGroup: {
    marginRight: theme.spacing(3)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const OrderToolbar = props => {
  const { className, onAddOrder, onSearch, onChangeTab, ...rest } = props;

  const classes = useStyles();

  const [value, setValue] = useState(0)

  const tabs = ["orders", "changes"]

  const formik = useFormik({
    initialValues: {
      query: ""
    },
    onSubmit: (value, actions) => {
      const { query } = value
      onSearch(query)
    }
  })

  const handlesChangeTap =(e, value) =>{
    onChangeTab(tabs[value])
    setValue(value);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />

        <BottomNavigation
          value={value}
          onChange={handlesChangeTap}
          showLabels
          className={classes.buttonGroup}
        >
          <BottomNavigationAction  label="Pedidos" icon={<ShoppingCartIcon />} />
          <BottomNavigationAction  label="Cambios" icon={<SwapVertIcon />} />
        </BottomNavigation>


        <Button
          color="primary"
          variant="contained"
          onClick={onAddOrder}
        >
          Agregar pedido
        </Button>
      </div>
      <div className={classes.row}>
        <form onSubmit={formik.handleSubmit}>
          <SearchInput
            value={formik.values.query}
            onChange={formik.handleChange}
            name="query"
            className={classes.searchInput}
            placeholder="Busaca un pedido"
          />
        </form>
      </div>
    </div>
  );
};

OrderToolbar.propTypes = {
  className: PropTypes.string,
  onAddOrder: PropTypes.func
};

export default OrderToolbar;
