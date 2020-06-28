import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import { 
    Card,
    CardHeader,
    Divider,
    CardContent,
    Typography
} from '@material-ui/core'
import clsx from 'clsx'
import { ThumbUp } from '@material-ui/icons'

const useStyle = makeStyles(theme=>({
    root:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    currierResume:{
        marginBottom: theme.spacing(2)
    },
    resume:{
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > div':{
            flex: 1
        }
    },
    payResume:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        background: theme.palette.success.main,
        borderRadius: '50%',
        color: theme.palette.success.contrastText,
        marginBottom: theme.spacing(1)
    }
}))


const ShippingDetail = props =>{
    const {className} = props
    const classes = useStyle(props)
    return(
        <Card className={clsx(className, classes.root)}>
            <CardHeader
                title="Envio"
                subheader="Informacion del envio"
            />
            <Divider/>
            <CardContent>
                <div className={classes.currierResume}>
                    <Typography align="center" variant="h3">Coordinadora</Typography>
                    <Typography align="center" variant="subtitle2">800427802</Typography>
                </div>
                <div className={classes.resume}>
                    <div>
                        <Typography align="center" variant="h4">$15.750</Typography>
                        <Typography align="center" variant="body2">valor del envio</Typography>
                    </div>
                    <div>
                        <Typography align="center" variant="h4">Contra entrega</Typography>
                        <Typography align="center" variant="body2">Modo</Typography>
                    </div>
                </div>
                <div className={classes.payResume}>
                    <div className={classes.icon}>
                        <ThumbUp color="inherit"/>
                    </div>
                    <Typography variant="body1" align="center">El valor ya fue cobrado y esta en la cuenta</Typography>
                </div>
            </CardContent>
        </Card>
    )
}


ShippingDetail.prototype = {
    className: PropTypes.string,

}


export default ShippingDetail