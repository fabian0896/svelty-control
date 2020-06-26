import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ClientProfile, AccountDetails, HistoryCard } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const OrderDetail = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={5}
          md={6}
          xl={5}
          xs={12}
        >
          <ClientProfile />
          <HistoryCard />
        </Grid>
        <Grid
          item
          lg={7}
          md={6}
          xl={7}
          xs={12}
        >
          <AccountDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetail;
