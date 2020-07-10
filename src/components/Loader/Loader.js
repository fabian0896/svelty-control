import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { CircularProgress, Backdrop } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))



const Loader = props => {
    const { loading } = props
    const classes = useStyles()

    return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loader