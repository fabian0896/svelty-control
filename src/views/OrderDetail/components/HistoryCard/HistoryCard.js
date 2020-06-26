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
    Avatar,
    Typography,
    Divider,
    Button,
} from '@material-ui/core';

import HistoryItem from './HistoryItem'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
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
                title="Historial"
                subheader="Historial del pedido desde que se creo"
            />
            <Divider />
            <CardContent>
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="text"
                >
                    Eliminar
        </Button>
                <Button variant="text">Editar</Button>
            </CardActions>
        </Card>
    );
};

HistoryCard.propTypes = {
    className: PropTypes.string
};

export default HistoryCard;
