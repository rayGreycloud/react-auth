import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
  // formProps contains email, password
  try {
    const response = await axios.post(
      'http://localhost:5000/signup',
      formProps
    );
    // Send action with jwt
    dispatch({ type: AUTH_USER, payload: response.data.token });
    // Set token in LS
    localStorage.setItem('token', response.data.token);
    callback(); // Pushes to /feature
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
