import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

import {useFormik} from 'formik'

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
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const OrderToolbar = props => {
  const { className, onAddOrder,onSearch, ...rest } = props;

  const classes = useStyles();


  const formik = useFormik({
    initialValues:{
      query: ""
    },
    onSubmit: (value, actions)=>{
      const {query} = value
      onSearch(query)
    }
  })

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
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
