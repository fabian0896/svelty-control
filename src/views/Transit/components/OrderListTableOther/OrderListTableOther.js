import React, { useState, useEffect } from 'react';
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
  Checkbox,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { MIPAQUETE_STATES } from '../../../../enviroment'
import numeral from 'numeral'

import { StatusBullet } from 'components';
import { select } from 'underscore';
import { Fragment } from 'react';

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
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const OrderListTableOther = props => {
  const { className, orders, onSetDelivered,onSetReturn, ...rest } = props;

  const classes = useStyles();
  const [selected, setSelected] = useState({})
  const [selectedAll, setSelectedAll] = useState(false)


  const calculateMipaqueteValue = (order) => {
    const totalProducts = order.products.reduce((prev, curr) => prev + curr.price, 0)
    return totalProducts - order.shipping_price
  }

  const handelCheck = (id) => () => {
    setSelected(value => ({ ...value, [id]: !value[id] }))
  }

  const handleSelectedAll = () => {
    setSelectedAll(value => !value)
  }

  useEffect(() => {
    const data = {}
    orders.forEach((order) => {
      data[order.id] = selectedAll
    })
    setSelected(data)
  }, [selectedAll])


  const isOneSelected = ()=>{
      return Object.keys(selected).map(v => selected[v]).reduce((prev, curr)=> prev || curr, false)
  }


  const handleSetDelivered = ()=>{
    const data = Object.keys(selected).filter(v => selected[v])
    onSetDelivered(data)
    setSelected({})
  }

  const handleSetReturn = ()=>{
    const data = Object.keys(selected).filter(v => selected[v])
    onSetReturn(data)
    setSelected({})
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <div>
            {
              isOneSelected() &&
              <Fragment>
                <Button
                  style={{ marginRight: 10 }}
                  size="small"
                  variant="outlined"
                  onClick={handleSetReturn}
                >
                  Marcar devoluciones
                </Button>
                <Button
                  color="primary"
                  size="small"
                  variant="outlined"
                  onClick={handleSetDelivered}
                >
                  Marcar Entregas
                </Button>
              </Fragment> 
            }
          </div>
        }
        title={`Pedidos Mipaquete (${orders.length})`}
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onChange={handleSelectedAll}
                      checked={selectedAll}
                    />
                  </TableCell>
                  <TableCell>Codigo Mipaquete</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Guia</TableCell>
                  <TableCell>Estado Mipaquete</TableCell>
                  <TableCell>Valor a pagar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected[order.id] || false}
                        onChange={handelCheck(order.id)}
                      />
                    </TableCell>
                    <TableCell>MP{order.mipaquete_code}</TableCell>
                    <TableCell>{order.firstName} {order.lastName}</TableCell>
                    <TableCell>
                      {moment(order.createdAt.seconds * 1000).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {order.guide_number}
                    </TableCell>
                    <TableCell>
                      {MIPAQUETE_STATES[order.shipping.state] ? MIPAQUETE_STATES[order.shipping.state].name : '---'}
                    </TableCell>
                    <TableCell>
                      {numeral(calculateMipaqueteValue(order)).format("$0,0")}
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

OrderListTableOther.propTypes = {
  className: PropTypes.string
};

export default OrderListTableOther;
