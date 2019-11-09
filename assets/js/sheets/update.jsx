import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';

import { approve_sheet } from '../ajax';
import { get_sheet } from '../ajax';

function state2props(state, props) {
  let id = parseInt(props.id);
  console.log(state.sheets.get(id));
  return {id: id, sheet: state.sheets.get(id)};
}

class SheetsUpdate extends React.Component
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

  render()
  {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    console.log("Update props")
    console.log(this.props);
    let {id, sheet} = this.props;

    if(!sheet)
    {
      get_sheet(id);
      console.log("Fetching from server");
      return(
        <div>
          <p>Loading sheet</p>
        </div>
      );
    }

    console.log("Sheet to show and update");
    console.log(sheet);
    return(
      <div>
        <br/>
        <h4>Date: {sheet.date}</h4>
        <table className = "table">
          <tbody>
            <tr>
              <th>Task Name</th>
              <th>Hours Spent</th>
            </tr>
            <tr>
              <td>{sheet.task1Name}</td>
              <td>{sheet.hours1}</td>
            </tr>
            <tr>
              <td>{sheet.task2Name}</td>
              <td>{sheet.hours2}</td>
            </tr>
            <tr>
              <td>{sheet.task3Name}</td>
              <td>{sheet.hours3}</td>
            </tr>
            <tr>
              <td>{sheet.task4Name}</td>
              <td>{sheet.hours4}</td>
            </tr>
            <tr>
              <td>{sheet.task5Name}</td>
              <td>{sheet.hours5}</td>
            </tr>
            <tr>
              <td>{sheet.task6Name}</td>
              <td>{sheet.hours6}</td>
            </tr>
            <tr>
              <td>{sheet.task7Name}</td>
              <td>{sheet.hours7}</td>
            </tr>
            <tr>
              <td>{sheet.task8Name}</td>
              <td>{sheet.hours8}</td>
            </tr>
          </tbody>
        </table>

        <Form.Group controlId="submit">
          <Button variant="primary" onClick = {() => approve_sheet(this)}>Approve</Button>
        </Form.Group>

      </div>
    );

    //return (<p>Hello</p>);
  }

}


export default connect(state2props)(SheetsUpdate);
