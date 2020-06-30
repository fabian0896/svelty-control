import React, { Fragment } from 'react'
import { Card, CardContent, Typography, Divider, IconButton } from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

import numeral from 'numeral'
import { Edit } from '@material-ui/icons'

const useStyle = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    content: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.dark,
        '& :first-child': {
            flex: 1
        }
    },
    providers: {
        padding: theme.spacing(1),
    },
    provider: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        '& > :first-child': {
            flex: 1
        }
    },
    editButton:{
        marginLeft: theme.spacing(2),
        color: theme.palette.primary.contrastText
    }
}))



const Products = props => {
    const { products } = props
    const classes = useStyle()

    return (
        <Fragment>

            {
                products.map((product) => {
                    return (
                        <Card key={product.id} className={classes.root}>
                            <div className={classes.content}>
                                <Typography color="inherit" variant="h3">{product.name}</Typography>
                                <div>
                                    <Typography color="inherit" align="center" variant="h4">{numeral(product.price).format('$0,0')}</Typography>
                                    <Typography color="inherit" align="center" variant="subtitle2">Valor de venta</Typography>
                                </div>
                                <div className={classes.editButton}>
                                    <IconButton  color="inherit">
                                        <Edit/>
                                    </IconButton>
                                </div>
                            </div>
                            <Divider />
                            <div className={classes.providers}>
                                {
                                    product.providers.map((provider, index) => {
                                        return (
                                            <div key={index} className={classes.provider}>
                                                <div>
                                                    <Typography variant="h5" >{provider.name}</Typography>
                                                    <Typography variant="body2" >Proveedor {index + 1}</Typography>
                                                </div>
                                                <div>
                                                    <Typography align="center" variant="h5">{numeral(provider.price).format('$0,0')}</Typography>
                                                    <Typography align="center" variant="body2">valor por mayor</Typography>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Card>
                    )
                })
            }
        </Fragment>
    )
}



export default Products

