import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';



const RouteWithLayoutPrivate = props => {
  const { layout: Layout, component: Component,user: User ,...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        !!User ? 
        <Layout user={User}>
          <Component {...matchProps} />
        </Layout>
        :
        <Redirect to={{pathname: "/sign-in"}}/>
      )}
    />
  );
};

RouteWithLayoutPrivate.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayoutPrivate;
