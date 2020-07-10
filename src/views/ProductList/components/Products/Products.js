import React, { Fragment } from 'react'
import { Card, Typography, Divider, IconButton } from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

import numeral from 'numeral'
import { Edit } from '@material-ui/icons'

const useStyle = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    content: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& :first-child': {
            flex: 1
        }
    },
    providers: {
        padding: theme.spacing(2),
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
    },
    divider:{
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    }
}))



const Products = props => {
    const { products, onEditProduct } = props
    const classes = useStyle()

    return (
        <Fragment>

            {
                products.map((product, index) => {
                    return (
                        <Card key={product.id} className={classes.root}>
                            <div className={classes.content}>
                                <div>
                                    <Typography variant="h3">{product.name}</Typography>
                                    <Typography variant="subtitle2">Nombre de la prenda</Typography>
                                </div>
                                <div>
                                    <Typography align="center" variant="h4">{numeral(product.price).format('$0,0')}</Typography>
                                    <Typography align="center" variant="subtitle2">Valor de venta</Typography>
                                </div>
                                <div className={classes.editButton}>
                                    <IconButton onClick={onEditProduct(index)}>
                                        <Edit/>
                                    </IconButton>
                                </div>
                            </div>
                            <Divider className={classes.divider} />  
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
                                                    <Typography align="right" variant="h5">{numeral(provider.price).format('$0,0')}</Typography>
                                                    <Typography align="right" variant="body2">valor por mayor</Typography>
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

