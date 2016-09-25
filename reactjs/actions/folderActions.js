import axios from 'axios';

import { constructConfig } from './common';


const hostname = window.location.origin;
const url = hostname + '/folders/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVyRXJpa2EiLCJvcmlnX2lhdCI6MTQ3NDczOTMxNCwidXNlcl9pZCI6MiwiZW1haWwiOiJhZG1pbkBlbGVjdHJvY29ycC5jb20iLCJleHAiOjE0NzUwMzkzMTR9.iRpgRFPJjA_doBNwA1_c1sVsTbuqoT6DyP2ccEfe4f8'


// Action fetches all folders as well as containing images
export function fetchFolders() {
  const config = constructConfig(token);
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({type: 'FETCH_FOLDERS_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_FOLDERS_REJECTED', payload: err})
      })
  }
}

// Creates a new folder on server
export function addFolder(name) {
  console.log('NAEM: ', name)
  const config = constructConfig(token);
  return function(dispatch) {
    axios.post(url, { name: name }, config)
      .then((response) => {
        dispatch({type: 'ADD_FOLDER_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'ADD_FOLDER_REJECTED', payload: err})
      })
  }
}

// Edit folder name on the server
export function editFolder(id, name) {
  const config = constructConfig(token);
  return function(dispatch) {
    axios.put(url + id, {name: name}, config)
      .then((response) => {
        dispatch({type: 'EDIT_FOLDER_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'EDIT_FOLDER_REJECTED', payload: err})
      })
  }
}

// Delete folder from server
export function deleteFolder(id) {
  const config = constructConfig(token);
  return function(dispatch) {
    axios.delete(url + id, config)
      .then((response) => {
        dispatch({type: 'DELETE_FOLDER_FULFILLED', payload: id})
      })
      .catch((err) => {
        dispatch({type: 'DELETE_FOLDER_REJECTED'}, payload: err)
      })
  }
} 