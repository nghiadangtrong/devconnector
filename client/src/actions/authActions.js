import * as types from "../config/types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => ({
  type: types.SET_CURRENT_USER,
  payload: decoded
})

// log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}))
}
