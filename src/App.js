import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";

/* custom component */
import Main from "./components/mainboard/Main";
import CreateAccount from "./components/auth/CreateAccount";
import AddPrivateContact from "./components/mainboard/AddPrivateContact";
import CreateChannel from "./components/mainboard/CreateChannel";

/* style */
import "./App.css";

/* default value */
import {
  defaultUsersArr,
  defaultChannelsArr,
  defaultChatHistoryArr
} from "./constants/defaultValues";

const usersArr = localStorage.users ? JSON.parse(localStorage.users) : [];
const channelsArr = localStorage.channels
  ? JSON.parse(localStorage.channels)
  : [];
const chatHistoryArr = localStorage.chatHistory
  ? JSON.parse(localStorage.chatHistory)
  : [];
const currentUser = localStorage.currentUser
  ? JSON.parse(localStorage.currentUser)
  : [];
const currentRoom = localStorage.currentRoom ? localStorage.currentRoom : "";

if (currentUser) {
  // Set currentUser
  store.dispatch(setCurrentUser(currentUser));
}

//Set default value if no data is registered
if (!usersArr.length) {
  localStorage.setItem("users", JSON.stringify(defaultUsersArr));
}

if (!channelsArr.length) {
  localStorage.setItem("channels", JSON.stringify(defaultChannelsArr));
}

if (!chatHistoryArr.length) {
  localStorage.setItem("chatHistory", JSON.stringify(defaultChatHistoryArr));
}

if (currentRoom === "") {
  localStorage.setItem("currentRoom", defaultChannelsArr[0].id);
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container">
              <Route exact path="/create-account" component={CreateAccount} />
              <Switch>
                <PrivateRoute exact path="/" component={Main} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-private-contact"
                  component={AddPrivateContact}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-channel"
                  component={CreateChannel}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
