import { AUTH_LOADING, SET_CURRENT_USER } from "./types";

// Create account
export const createAccount = userData => dispatch => {
  dispatch(setLoading());
  let users = JSON.parse(localStorage.users);
  users.push(userData);
  localStorage.setItem("currentUser", JSON.stringify(userData));
  localStorage.setItem("users", JSON.stringify(users));
  // Set current user
  dispatch(setCurrentUser(userData));
};

// Add contacts
export const addContacts = (userid, newContacts) => dispatch => {
  dispatch(setLoading());
  let users = JSON.parse(localStorage.users);
  let currentUser = JSON.parse(localStorage.currentUser);
  users = users.filter(user => user.id !== userid);
  currentUser = {
    id: currentUser.id,
    userName: currentUser.userName,
    fullName: currentUser.fullName,
    contacts: newContacts
  };
  users.push(currentUser);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("users", JSON.stringify(users));
  // Set current user
  dispatch(setCurrentUser(currentUser));
};

// Set loading
export const setLoading = () => {
  return {
    type: AUTH_LOADING,
    payload: null
  };
};

// Set registered in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
