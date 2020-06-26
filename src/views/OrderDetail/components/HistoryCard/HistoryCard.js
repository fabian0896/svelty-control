import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Divider,
    Button,
    IconButton
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons'

import HistoryItem from './HistoryItem'

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    },
    details: {
        display: 'flex'
    },
    avatar: {
        marginLeft: 'auto',
        height: 110,
        width: 100,
    },
    progress: {
        marginTop: theme.spacing(2)
    },
    uploadButton: {
        marginRight: theme.spacing(2)
    },
    nameLetter: {
        height: 80,
        width: 80,
        marginLeft: 'auto'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const HistoryCard = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const user = {
        name: 'Fabian David Dueñas Garcia',
        city: 'Los Angeles',
        country: 'USA',
        timezone: 'GTM-7',
        avatar: '/images/avatars/avatar_11.png'
    };

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                title="Seguimiento"
                subheader="Historial del pedido desde que se creo"
                action={
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                }
            />
            <Divider />
            <CardContent>
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
            </CardContent>
        </Card>
    );
};

HistoryCard.propTypes = {
    className: PropTypes.string
};

export default HistoryCard;
