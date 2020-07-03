import React from 'react'

import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, Avatar, Divider, CardContent } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    content:{
        height: 250
    }
}))

const ProviderCard = props => {

    const classes = useStyles(props)

    return (
        <Card className={classes.root}>
            <CardHeader
                subheaderTypographyProps={{
                    variant: 'body2',
                    color: 'textSecondary'
                }}
                titleTypographyProps={{
                    variant: 'h5',
                }}
                title="Fajas Internacionales"
                subheader="Lista de prendas en produccion de fajas internacionales"
                avatar={
                    <Avatar>
                        FI
                    </Avatar>
                }
            />
            <Divider />
            <CardContent className={classes.content}>
                provider Card

            </CardContent>
        </Card>
    )
}



export default ProviderCard