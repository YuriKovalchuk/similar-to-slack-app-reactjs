import Validator from "validator";
import isEmpty from "./is-empty";

function accountValidation(data) {
  let errors = {};
  const users = JSON.parse(localStorage.users);

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "User Name field is required.";
  }

  if (!isEmpty(users.filter(user => user.userName === data.userName))) {
    errors.userName = "Same User Name already exists.";
  }

  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "Full Name field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export default accountValidation;
