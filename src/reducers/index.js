import { combineReducers } from "redux";
import authReducer from "./authReducer";
import resourceReducer from "./resourceReducer";

export default combineReducers({
  auth: authReducer,
  resource: resourceReducer
});
