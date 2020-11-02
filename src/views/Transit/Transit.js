import React, { useState} from 'react';
import { OrderToolbar, OrderListTable } from './components';
import { Loader } from 'components'
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    },
    pagination: {
      marginTop: theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }, 
    divider:{
        margin: `${theme.spacing(2)}px 0px`
    }
  }));



const Transit = props => {
    
    const [loading, setLoading] = useState(false)
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Loader loading={loading} />
            <OrderToolbar />
            <div className={classes.content}>
                <OrderListTable/>
                <Divider className={classes.divider} />
                <OrderListTable/>
            </div>
            
        </div>
    )
}




export default Transit

