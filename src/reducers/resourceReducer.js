import isEmpty from "../validation/is-empty";

import { GET_RESOURCE, RESOURCE_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  resource: {
    users: [],
    channels: [],
    chatHistory: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESOURCE_LOADING:
      return {
        ...state,
        loading: true,
        resource: {
          users: [],
          channels: [],
          chatHistory: []
        }
      };
    case GET_RESOURCE:
      return {
        ...state,
        loading: false,
        resource: action.payload
      };
    default:
      return state;
  }
}
