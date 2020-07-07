import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid,  } from '@material-ui/core';

import {OrderResumeCard} from './components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Shippings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          aqui va el formulario para agregar el envio
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <OrderResumeCard/>
          <OrderResumeCard/>
          <OrderResumeCard/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Shippings;
