import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

import {csvGenerator} from 'csvGenerator'

import { orderService } from 'firebaseService'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const handleCvsGenerator = async ()=>{
    
    const header = {
      email: 'email',
      phone: 'phone',
      firstName: 'fn',
      lastName: 'ln',
      ct: 'ct',
      st: 'st',
      country: 'country',
      gen: 'gen',
      event_name: 'event_name',	
      event_time: 'event_time',	
      value: 'value',	
      currency: 'currency',
      event_id: 'event_id',
    }

    const dbData = await orderService.getAllOrdersFull()

    const formatData = dbData.filter(v => !!v.email).map(v =>({
        email: v.email,
        phone: `57${v.phone}`,
        firstName: v.firstName,
        lastName: v.lastName,
        ct: v.city.name,
        st: v.city.department_name,
        country: "CO",
        gen: "F",
        event_name: "Purchase",
        event_time: v.createdAt.seconds,
        value: v.products.reduce((prev, curr)=> prev + curr.price, 0),
        currency: "COP",
        event_id: v.id
    }))

    csvGenerator.exportCSVFile(header, formatData, "datos")
  }
  
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid item xs={12}>
            <Button onClick={handleCvsGenerator}>Generar Reporte Marketing</Button>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
