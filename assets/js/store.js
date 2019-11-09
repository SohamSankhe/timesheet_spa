import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';


// Ref: http://www.ccs.neu.edu/home/ntuck/courses/2019/09/cs5610/notes/16-spa/notes.html


function new_sheet(st0 = {date: null, task1Name: "", hours1: 0,
                          task2Name: "", hours2: 0,
                          task3Name: "", hours3: 0,
                          task4Name: "", hours4: 0,
                          task5Name: "", hours5: 0,
                          task6Name: "", hours6: 0,
                          task7Name: "", hours7: 0,
                          task8Name: "", hours8: 0,
                          errors: null}, action) {
  switch (action.type) {
    case 'CHANGE_NEW_SHEET':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function login(st0 = {email: "", password: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    new_sheet,
    login,
  });
  return reducer(st0, action);
}

function users(st0 = new Map(), action) {
  return st0;
}

function sheets(st0 = new Map(), action) {
  switch (action.type) {
    case 'ADD_SHEETS':
      console.log("Setting sheet");
      console.log(action);
      let newState = new Map(st0);
      for(let sheet of action.data)
      {
        newState.set(sheet.id, sheet);
      }
      console.log(newState);
      return newState;
    default:
      return st0;
  }
  //return st0;
}

let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}


function root_reducer(st0, action) {
  //console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    users,
    sheets,
    session,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;
