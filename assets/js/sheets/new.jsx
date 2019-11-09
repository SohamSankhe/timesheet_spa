import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_new_sheet } from '../ajax';

import store from '../store';

function state2props(state) {
  return state.forms.new_sheet;
}

class SheetsNew extends React.Component
{
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_SHEET',
      data: data,
    });
  }

  render() {
    let {date, task1Name, hours1,
                task2Name, hours2,
                task3Name, hours3,
                task4Name, hours4,
                task5Name, hours5,
                task6Name, hours6,
                task7Name, hours7,
                task8Name, hours8,
                errors, dispatch} = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let user = store.getState().session;

    if(user == null)
    {
      return <h2 style =
        {{fontFamily:"verdana",textAlign:"center", paddingTop:"30px"}}>
        Please login to create timesheets</h2>;
    }

    if(user.is_manager)
    {
      return (
        <div>
          <h2 style =
            {{fontFamily:"verdana",textAlign:"center", paddingTop:"30px"}}>
            Only workers can fill timesheets</h2>
        </div>
      );
    }


    return(
      <div>
        <h1>New Timesheet</h1>
        { error_msg }
        <Form.Group controlId="sheetDate">
          <Form.Label><b>Date</b></Form.Label>
          <Form.Control type="date" onChange = {(ev) => this.changed({date: ev.target.value})}/>
        </Form.Group>
        <table>
          <tbody>
            <tr>
              <th style={{textAlign:"center"}}>Job Code</th>
              <th style={{textAlign:"center"}}>Hours Spent</th>
            </tr>
            <tr>
              <td><input type = "text" onChange = {(ev) => this.changed({task1Name: ev.target.value})}></input></td>
              <td><input type = "text" onChange = {(ev) => this.changed({hours1: ev.target.value})}></input></td>
            </tr>
            <tr>
              <td><input type = "text" onChange = {(ev) => this.changed({task2Name: ev.target.value})}></input></td>
              <td><input type = "text" onChange = {(ev) => this.changed({hours2: ev.target.value})}></input></td>
            </tr>
            <tr>
              <td><input type = "text" onChange = {(ev) => this.changed({task3Name: ev.target.value})}></input></td>
              <td><input type = "text" onChange = {(ev) => this.changed({hours3: ev.target.value})}></input></td>
            </tr>
            <tr>
              <td><input type = "text" onChange = {(ev) => this.changed({task4Name: ev.target.value})}></input></td>
              <td><input type = "text" onChange = {(ev) => this.changed({hours4: ev.target.value})}></input></td>
            </tr>
            <tr>
              <td><input type = "text" onChange = {(ev) => this.changed({task5Name: ev.target.value})}></input></td>
              <td><input type = "text" onChange = {(ev) => this.changed({hours5: ev.target.value})}></input></td>
            </tr>
            <tr>
              <td><input type = "text" onChange = {(ev) => this.changed({task6Name: ev.target.value})}></input></td>
              <td><input type = "text" onChange = {(ev) => this.changed({hours6: ev.target.value})}></input></td>
            </tr>
            <tr>
              <td><input type = "text" onChange = {(ev) => this.changed({task7Name: ev.target.value})}></input></td>
              <td><input type = "text" onChange = {(ev) => this.changed({hours7: ev.target.value})}></input></td>
            </tr>
            <tr>
              <td><input type = "text" onChange = {(ev) => this.changed({task8Name: ev.target.value})}></input></td>
              <td><input type = "text" onChange = {(ev) => this.changed({hours8: ev.target.value})}></input></td>
            </tr>
          </tbody>
        </table>
        <br/>
        <button onClick = {() => submit_new_sheet(this)}>Submit</button>
      </div>
    );
  }
}



export default connect(state2props)(SheetsNew);
