import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import store from './store';
// Ref: https://github.com/NatTuck/lens/blob/spa1-setup/

import SheetsNew from './sheets/new';
import SheetsShow from './sheets/show';
import Login from './login';
import Home from './home';
import SheetsList from './sheets/index';
import SheetsUpdate from './sheets/update';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  console.log("Checking store");
  console.log(store.getState());

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Col md ="8">
          <Nav>
            <Nav.Item>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/sheets/new" exact activeClassName="active" className="nav-link">
                New Timesheet
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/sheets/index" exact activeClassName="active" className="nav-link">
                View Timesheets
              </NavLink>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md ="4">
          <Session />
        </Col>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/users">
          <h1>Users</h1>
        </Route>

        <Route exact path="/sheets/new">
          <SheetsNew/>
        </Route>

        <Route exact path="/sheets/index">
          <SheetsList/>
        </Route>

        <Route exact path="/sheets/:id" render = {(props) =>
          <SheetsShow id = {props.match.params.id}/>}
          />

          <Route exact path="/sheets/update/:id" render = {(props) =>
            <SheetsUpdate id = {props.match.params.id}/>}
            />

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
  }

  if (session) {
    return (
      <Nav>
        <Nav.Item>
          <p className="text-light py-2">User: {session.user_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </Nav.Item>
      </Nav>
    );
  }
  else {
    return (
      <Nav>
        <Nav.Item>
          <NavLink to="/login" exact activeClassName="active" className="nav-link">
            Login
          </NavLink>
        </Nav.Item>
      </Nav>
    );
  }
});
