import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { get_sheet } from '../ajax';

function state2props(state, props) {
  let id = parseInt(props.id);
  console.log(state.sheets.get(id));
  return {id: id, sheet: state.sheets.get(id)};
}

function SheetsShow({id, sheet})
{

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

  let is_approved = "false";
  if(sheet.is_approved)
  {
    is_approved = "true";
  }

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
      <h4>Is approved: {is_approved}</h4>
    </div>
  );
}


export default connect(state2props)(SheetsShow);
