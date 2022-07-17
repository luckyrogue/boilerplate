import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Layout
import Layout from './components/layouts/Layout';

// Protected Routes
import PrivateRoute from './utils/PrivateRoute';

// Pages
import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Activate from './pages/auth/Activate';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Layout>
            <Route path='/' exact component={Home} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/forgot-password' exact component={ForgotPassword} />
            <Route path='/auth/activate/:token' exact component={Activate} />
            <Route
              path='/auth/password/reset/:token'
              exact
              component={ResetPassword}
            />
          </Layout>
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
