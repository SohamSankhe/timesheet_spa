import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';


function state2props(state) {
  return state.session;
}

class Home extends React.Component
{
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  render() {
    return(
      <div>
        <h1 style =
          {{fontFamily:"verdana",textAlign:"center", paddingTop:"30px"}}>
          Welcome to the Timesheet App!
        </h1>
      </div>
    );

  }
}


export default connect(state2props)(Home);
