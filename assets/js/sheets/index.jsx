import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import _ from 'lodash';

import { list_sheets } from '../ajax';
import store from '../store';

const mapToProps = state => ({sheets: state.sheets})

function state2props(state) {
  return mapToProps;
}

class SheetsList extends React.Component
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

  showSheet(linkToSheet)
  {
    this.redirect(linkToSheet);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let user = store.getState().session;
    if(user == null)
    {
        return <h2 style =
          {{fontFamily:"verdana",textAlign:"center", paddingTop:"30px"}}>
          Please log in to view your timesheets</h2>;
    }

    if (this.props.sheets.size == 0) {
      list_sheets();
    }

    let sheetLi = _.map([...this.props.sheets], ([_, sheet]) => {
      console.log("sheet");
      console.log(sheet);

      var sheetDate = sheet.date;
      var linkToSheet = "/sheets/" + sheet.id;
      var linkToUpdateSheet = "/sheets/update/" + sheet.id;

      if(!user.is_manager)
      {
        return (<li><h4>Date: {sheetDate} &nbsp;
                <button onClick = {() => this.showSheet(linkToSheet)}>Show</button>
            </h4>
          </li>);
      }

      return (<li><h4>Date: {sheetDate} &nbsp;
              <button onClick = {() => this.showSheet(linkToSheet)}>Show</button> &nbsp;
              <button onClick = {() => this.showSheet(linkToUpdateSheet)}>Approve</button>
          </h4>
        </li>);

    });

    return (
      <div>
        <h1>Sheets</h1>
        <div className="row">
          <ul>
            {sheetLi}
          </ul>
        </div>
      </div>
    );

    //return (<h1>Hello</h1>);

  }
}


export default connect(state2props)(SheetsList);
