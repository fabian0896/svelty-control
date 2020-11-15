import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { StatusBullet } from 'components';
import numeral from 'numeral'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  egreesButton: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(2)
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger',
  income: "success",
  egrees: "danger",
};

const LatestOrders = props => {
  const { className, list, ...rest } = props;

  const classes = useStyles();

  

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <div>
            <Button
              color="primary"
              size="small"
              variant="outlined"
            >
              Nuevo Ingreso
            </Button>
            <Button
              className={classes.egreesButton}
              color="inherit"
              size="small"
              variant="outlined"
            >
              Nuevo Egreso
            </Button>
          </div>
        }
        title="Ingresos y Egresos"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Fecha
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map(order => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>{order.title}</TableCell>
                    <TableCell>{order.description}</TableCell>
                    <TableCell>
                      {moment(order.date.seconds * 1000).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[order.type]}
                          size="sm"
                        />
                        {numeral(order.value).format("$0,0")}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
