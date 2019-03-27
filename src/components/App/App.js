import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

// import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
// import UserPage from '../UserPage/UserPage';
// import InfoPage from '../InfoPage/InfoPage';
// adding admin page
import Admin from '../Admin/Admin';
// end adding admin page
//importPrintQr
import PrintQr from '../Admin/ManageQr/PrintQr';
//end import

import './App.css';
import UserLandingPage from '../UserLandingPage/UserLandingPage';
import EmployeeManagement from '../Admin/EmployeeManagement/EmployeeManagement';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <Route
              exact //!Commented out for ability to add params into url
              path="/home"
              component={UserLandingPage}
            />
            {/* <Route
              exact //!Commented out for ability to add params into url
              path="/home/:id"
              component={UserLandingPage}
            /> */}

            <Route
              exact //!Commented out for ability to add params into url
              path="/1/:id"
              component={UserLandingPage}
            />
            
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            {/* Admin Page route */}
            <ProtectedRoute
              exact
              path="/admin"
              component={Admin}
            />
            {/* end admin page route */}
            {/* <ProtectedRoute
              exact
              path="/productform"
              component={ProductForm}
            /> */}
            <Route
            path="/UserLandingPage"
            component={UserLandingPage} />
            <ProtectedRoute
              exact
              path="/employees"
              component={EmployeeManagement}
            />
            <ProtectedRoute
            path="/PrintQr"
            component={PrintQr}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
