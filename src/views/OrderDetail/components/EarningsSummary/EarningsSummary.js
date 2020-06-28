import React from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/styles'
import clsx from 'clsx'
import { Card, CardHeader, Divider, CardContent, Typography } from '@material-ui/core'


const useStyle = makeStyles(theme=>({
    root:{
        marginTop: theme.spacing(2)
    },
    item:{
        display: 'flex',
        marginBottom: theme.spacing(2)
    },
    title:{
        flex: 1
    },
    add:{
        color: theme.palette.success.main
    },
    subtract:{
        color: theme.palette.error.main
    }
}))


const EarningsSummary = props => {
    const {className} = props

    const classes = useStyle(props)

    return(
        <Card className={clsx(className, classes.root)}>
            <CardHeader
                title="Ganancia"
                subheader="Resumen de ganacias del pedido"
            />
            <Divider/>
            <CardContent>
                <div className={classes.item}>
                    <Typography className={classes.title} variant="h5">
                        Valor de venta 
                    </Typography>
                    <Typography className={classes.add} color="inherit" variant="h5">
                        +$78.000 
                    </Typography>
                </div>
                <div className={classes.item}>
                    <Typography className={classes.title} variant="h5">
                        Valor de las prendas
                    </Typography>
                    <Typography className={classes.subtract} color="inherit" variant="h5">
                        -$36.000 
                    </Typography>
                </div>
                <div className={classes.item}>
                    <Typography className={classes.title} variant="h5">
                        Envio 
                    </Typography>
                    <Typography className={classes.subtract} color="inherit" variant="h5">
                        -$17.350 
                    </Typography>
                </div>
               <div className={classes.resume}>
                   <Typography className={classes.add} color="inherit" align="center" variant="h3">$20.000</Typography>
                   <Typography align="center" variant="subtitle2">Ganancia total</Typography>
               </div>
            </CardContent>
        </Card>
    )
}


EarningsSummary.prototype = {
    className: PropTypes.string
}


export default EarningsSummary