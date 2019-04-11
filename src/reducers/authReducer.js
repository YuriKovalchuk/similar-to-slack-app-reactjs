import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, AUTH_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  isRegistered: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        isRegistered: false,
        user: null
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        isRegistered: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
