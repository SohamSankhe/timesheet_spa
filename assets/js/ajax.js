// Ref: https://github.com/NatTuck/lens/blob/spa3-uploads/

import store from './store';

export function post(path, body) {
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function put(path, body) {
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'put',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function get(path) {
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}

export function approve_sheet(form)
{
  var id = form.props.id
  var sheet = form.props.sheet

  sheet.is_approved = true;
  var path = "/sheets/" + id;
  put(path, {
      sheet: {
        date: sheet.date,
        task1Name: sheet.task1Name,
        hours1: sheet.hours1,
        user_id: 1,
        is_approved: sheet.is_approved,
      }
    }).then((resp) => {
      console.log("resp");
      console.log(resp);
      if (resp.data) {
        store.dispatch({
          type: 'ADD_SHEETS',
          data: [resp.data],
        });
        console.log("Redirecting");
        form.redirect('/sheets/' + resp.data.id);
      }
      else {
        store.dispatch({
          type: 'CHANGE_NEW_SHEET',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
  });
}

export function submit_new_sheet(form) {
  let state = store.getState();
  console.log("state", state);
  let data = state.forms.new_sheet;
  let userId = store.getState().session.user_id;
  post('/sheets', {
      sheet: {
        date: data.date,
        task1Name: data.task1Name,
        hours1: data.hours1,
        task2Name: data.task2Name,
        hours2: data.hours2,
        task3Name: data.task3Name,
        hours3: data.hours3,
        task4Name: data.task4Name,
        hours4: data.hours4,
        task5Name: data.task5Name,
        hours5: data.hours5,
        task6Name: data.task6Name,
        hours6: data.hours6,
        task7Name: data.task7Name,
        hours7: data.hours7,
        task8Name: data.task8Name,
        hours8: data.hours8,
        user_id: userId,
      }
    }).then((resp) => {
      console.log("resp");
      console.log(resp);
      if (resp.data) {
        store.dispatch({
          type: 'ADD_SHEETS',
          data: [resp.data],
        });
        console.log("Redirecting");
        form.redirect('/sheets/' + resp.data.id);
      }
      else {
        store.dispatch({
          type: 'CHANGE_NEW_SHEET',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }

  });
}

export function get_sheet(sheetId)
{
  get('/sheets/' + sheetId)
    .then((resp) => {
        store.dispatch({
          type: 'ADD_SHEETS',
          data: [resp.data],
        });
    });
}

export function list_sheets()
{
  get('/sheets')
    .then((resp) => {
        console.log(resp);
        store.dispatch({
          type: 'ADD_SHEETS',
          data: [resp.data],
        });
    });
}


export function submit_login(form) {
  let state = store.getState();
  let data = state.forms.login;

  post('/sessions', data)
    .then((resp) => {
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN',
          data: resp,
        });
        form.redirect('/');
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}
