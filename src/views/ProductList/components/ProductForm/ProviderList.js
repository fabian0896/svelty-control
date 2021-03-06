import React from 'react'
import {
    List, ListItemText, ListItem, ListItemSecondaryAction, IconButton
} from '@material-ui/core'

import {
    Cancel
} from '@material-ui/icons'


import numeral from 'numeral'




const ProviderList = props=>{
    const {providers, onDelete} = props
    return(
        <List>
            {
                providers.map((item, index)=>{
                    return (
                    <ListItem key={index}>
                        <ListItemText
                            primary={item.name}
                            secondary={numeral(item.price).format('$0,0')}
                        />
                        <ListItemSecondaryAction>
                            <IconButton onClick={onDelete(index)}>
                                <Cancel/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    )
                })
            }
        </List>
    )
}


export default ProviderList