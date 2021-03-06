import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import {orderService} from 'firebaseService'
import {PackagingList} from './components'

import {ThumbUpOutlined, Cancel} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Packaging = () => {
  const classes = useStyles();

  const [pakagingList, setPakagingList] = useState([])
  const [pakagingChageList, setPakagingChageList] = useState([])
  const [orderDispatched, setOrderDispatched] = useState([])
  const [orderChageDispatched, setOrderChageDispatched] = useState([])
  const [loading, setLoading] = useState(null)

  useEffect(()=>{
    const unsuscribePackagin = orderService.getOrdersForPackaging(data=>{
      setPakagingList(data)
    })
    const unsuscribePackaginChages = orderService.getOrdersChangesForPackaging(data=>{
      setPakagingChageList(data)
    })

    const unsuscribedPacked = orderService.getOrderpacked((data)=>{
      setOrderDispatched(data)
    })
    const unsuscribedChagePacked = orderService.getOrderCahegepacked((data)=>{
      setOrderChageDispatched(data)
    })

    return ()=>{
      unsuscribedPacked()
      unsuscribePackagin()
      unsuscribePackaginChages()
      unsuscribedChagePacked()
    }
  }, [])


  const handlePackage = (id) => async ()=>{
      setLoading(id)
      await orderService.setOrderState(id, 'packed')
      setLoading(null)
  }

  const handleCancelPackage = (id)=>async ()=>{
    setLoading(id)
    await orderService.setOrderState(id, 'productReady')
    setLoading(null)
  }

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
          <Typography variant="h2" gutterBottom>Por empacar:</Typography>
          <PackagingList
            icon={
              <ThumbUpOutlined/>
            } 
            iconColor='success'  
            selectable
            loading={loading} 
            onActionClick={handlePackage} 
            orders={[...pakagingList, ...pakagingChageList]} />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <Typography variant="h2" gutterBottom>Empacado:</Typography>
          <PackagingList
            icon={
              <Cancel/>
            }
            iconColor='error' 
            loading={loading} 
            onActionClick={handleCancelPackage} 
            orders={[...orderDispatched, ...orderChageDispatched]} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Packaging;
