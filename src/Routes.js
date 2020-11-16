import React, { useState, Fragment } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, RouteWithLayoutPrivate } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';


import { isAuth } from './services/authService'

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  Typography as TypographyView,
  Icons as IconsView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  NewOrder as NewOrderView,
  OrderList as OrderListView,
  OrderDetail as OrderDetailView,
  Production as ProductionView,
  Stock as StockView,
  Pakaging as PakagingViwe,
  Shippings as ShippingsView,
  TrakingList as TrakingListView,
  TransitList as TransitListView,
  Finance as FinanceView,
  NewChange as NewChangeView
} from './views';

const Routes = () => {

  const [user, setUser] = useState()
  
  isAuth((actualUser)=>{
    setUser(actualUser)
  })


  return (
    <Fragment>
      {
      !!user?
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={ProductionView}
          exact
          layout={MainLayout}
          path="/produccion"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={OrderListView}
          exact
          layout={MainLayout}
          path="/pedidos"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={ProductListView}
          exact
          layout={MainLayout}
          path="/prendas"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={StockView}
          exact
          layout={MainLayout}
          path="/stock"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={PakagingViwe}
          exact
          layout={MainLayout}
          path="/empaquetado"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={ShippingsView}
          exact
          layout={MainLayout}
          path="/envios"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={TrakingListView}
          exact
          layout={MainLayout}
          path="/traking"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={TransitListView}
          exact
          layout={MainLayout}
          path="/transito"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={FinanceView}
          exact
          layout={MainLayout}
          path="/finanzas"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={TypographyView}
          exact
          layout={MainLayout}
          path="/typography"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={IconsView}
          exact
          layout={MainLayout}
          path="/icons"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={OrderDetailView}
          exact
          layout={MainLayout}
          path="/account"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={OrderDetailView}
          exact
          layout={MainLayout}
          path="/pedidos/:orderId"
        />
        <RouteWithLayoutPrivate
          user={user}
          component={SettingsView}
          exact
          layout={MainLayout}
          path="/settings"
        />
          <RouteWithLayoutPrivate
            user={user} 
            component={NewOrderView}
            exact
            layout={MainLayout}
            path="/pedido/nuevo"
          />
          <RouteWithLayoutPrivate
            user={user} 
            component={NewChangeView}
            exact
            layout={MainLayout}
            path="/cambios/nuevo/:orderId"
          />
        <RouteWithLayoutPrivate
          user={user} 
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        <Redirect to="/dashboard" />
      </Switch>
      :
      <Switch>
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-in"
        />
        <Redirect to="/sign-in" />
      </Switch>
      }
    </Fragment>
  );
};

export default Routes;
