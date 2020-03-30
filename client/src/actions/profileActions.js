import axios from 'axios';
import * as types from '../config/types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res => {
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: types.GET_PROFILE,
        payload: {}
      })
    })
}

export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const deleteAccount = () => dispatch => {
  if(window.confirm("Are you sure? this can NOT be undone!")) {
    axios
      .delete('/api/profile')
      .then(res => {
        dispatch({
          type: types.SET_CURRENT_USER,
          payload: {}
        })
      })
      .catch(err => {
        dispatch({
          type: types.GET_ERRORS,
          payload: err.response.data
        })
      })
  }
}

export const setProfileLoading = () => {
  return {
    type: types.PROFILE_LOADING
  }
}

export const clearCurrentProfile = () => {
  return {
    type: types.CLEAR_CURRENT_PROFILE
  }
}
