import React from 'react'
import {makeStyles} from '@material-ui/styles'


const useStyles = makeStyles(theme =>({
    root:{
        padding: theme.spacing(3)
    }
}))

const Finance = props =>{
    const classes = useStyles()

    return(
        <div className={classes.root}>
            Finanzas
        </div>
    )
}


export default Finance
