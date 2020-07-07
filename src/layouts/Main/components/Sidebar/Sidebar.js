import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { Profile, SidebarNav } from './components';

import { 
  ShoppingCart as ShoppingCartIcon,
  HourglassEmpty as HourglassEmptyIcon,
  AccessibilityNew as AccessibilityNewIcon,
  Archive as ArchiveIcon,
  AllInbox as AllInboxIcon,
  FlightTakeoff as FlightTakeoffIcon
} from '@material-ui/icons'


const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className,user, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Inicio',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Pedidos',
      href: '/pedidos',
      icon: <ShoppingCartIcon />
    },
    {
      title: 'Producción',
      href: '/produccion',
      icon: <HourglassEmptyIcon />
    },
    {
      title: 'Prendas',
      href: '/prendas',
      icon: <AccessibilityNewIcon />
    },
    {
      title: 'Stock',
      href: '/stock',
      icon: <ArchiveIcon />
    },
    {
      title: 'Empaquetado',
      href: '/empaquetado',
      icon: <AllInboxIcon />
    },
    {
      title: 'Envios',
      href: '/envios',
      icon: <FlightTakeoffIcon />
    },
    {
      title: 'Authentication',
      href: '/sign-in',
      icon: <LockOpenIcon />
    },
    {
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />
    },
    {
      title: 'Icons',
      href: '/icons',
      icon: <ImageIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile user={user} />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
