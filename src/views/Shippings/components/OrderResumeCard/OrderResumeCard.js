import React from 'react'
import {makeStyles} from '@material-ui/styles'
import { Card, CardHeader, Divider, CardContent, Typography,Avatar, CardActionArea } from '@material-ui/core'


const useStyles = makeStyles(theme =>({
    root:{
        marginBottom: theme.spacing(2)
    },
    content:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > div':{
            flex: 1
        }
    },
    footer:{
        padding: theme.spacing(1),
        background: theme.palette.info.main,
        color: theme.palette.info.contrastText
    }
}))



const OrderResumeCard = props =>{

    const classes = useStyles(props)

    return(
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                      FD
                    </Avatar>
                  }
                  subheaderTypographyProps={{
                    variant: 'body2',
                    color: 'textSecondary'
                  }}
                  titleTypographyProps={{
                    variant: 'h5',
                  }}
                  title="Fabian David Dueñas Garcia"
                  subheader="MEDELLIN(ANTIOQUIA)"
            />
            <Divider/>
            <CardContent>
                <div className={classes.content}>
                    <div>
                        <Typography align="center" variant="h4">$78.000</Typography>
                        <Typography align="center" variant="subtitle2">Valor de venta</Typography>
                    </div>
                    <div>
                        <Typography align="center" variant="h4">1</Typography>
                        <Typography align="center" variant="subtitle2">Prenda</Typography>
                    </div>
                    <div>
                        <Typography align="center" variant="h4">Hace 3 dias</Typography>
                        <Typography align="center" variant="subtitle2">Pedido creado</Typography>
                    </div>
                </div>
            </CardContent>
            <CardActionArea className={classes.footer}>
                <Typography color="inherit" align="center" variant="h5">Contra entrega</Typography>
            </CardActionArea>
        </Card>
    )
}

export default OrderResumeCard