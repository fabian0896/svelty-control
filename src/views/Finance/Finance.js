import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import {
    Budget,
    TotalUsers,
    TasksProgress,
    TotalProfit,
    FinanceResume,
    DateSelector
  } from './components';

import {orderService} from 'firebaseService'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    }
}))

const Finance = props => {
    const classes = useStyles()

    useEffect(()=>{
        const fetchFunction = async ()=>{
            const data = await orderService.getCompleteOrdersByDate()
            console.log(data)
        }
        fetchFunction()    
    },[])

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <DateSelector/>
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

                <Grid item xs={12}>
                    <FinanceResume/>
                </Grid>
            </Grid>
        </div>
    )
}


export default Finance
