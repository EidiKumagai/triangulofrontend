import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';
import Auth0 from './helpers/auth0';
import { isAuthenticated } from "./containers/Page/auth";

const RestrictedRoute = ({ component: Component, ...rest }) => (
  
  <Route
    {...rest}
    render={props => isAuthenticated()  
      ? <Component {...props} />
      : <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />}
  />
);



const PublicRoutes = ({ history}) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/404'}
          component={asyncComponent(() => import('./containers/Page/404'))}
        />
        <Route
          exact
          path={'/500'}
          component={asyncComponent(() => import('./containers/Page/500'))}
        />
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/signup'}
          component={asyncComponent(() => import('./containers/Page/signup'))}
        />
        <Route
          exact
          path={'/forgotpassword'}
          component={asyncComponent(() =>
            import('./containers/Page/forgotPassword'))}
        />
        <Route
          exact
          path={'/resetpassword/:token/:email'}
          component={asyncComponent(() =>
            import('./containers/Page/resetPassword'))}
        />
        {/* <Route
          exact
          path={'/comingSoon'}
          component={asyncComponent(() =>
            import('./containers/Page/comingSoon')
          )}
        /> */
        }

        <Route
          path="/auth0loginCallback"
          render={props => {
            Auth0.handleAuthentication(props);
          }}
        />
        <RestrictedRoute
          path="/dashboard"
          component={App}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(null,{ isAuthenticated })(PublicRoutes);
// export default connect(state => ({
//   Login: state.Auth.get('triangulo') !== null,
// }))(PublicRoutes);
//export default PublicRoutes