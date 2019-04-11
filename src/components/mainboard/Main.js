import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import uuidv1 from "uuid/v1";

/* mui core dependencies */
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import withWidth from "@material-ui/core/withWidth";

/* custom components */
import CommonLayout from "../layout/CommonLayout";
import Message from "../common/Message";
import Spinner from "../common/Spinner";

/* custom style && theme */
import layoutStyles from "../../styles/layout";
import theme from "../../styles/theme";

/* actions */
import { getResource, sendMessage } from "../../actions/resourceActions";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open:
        this.props.width === "sm" || this.props.width === "xs" ? false : true,
      loading: true,
      currentRoom: localStorage.currentRoom,
      currentUser: props.auth.user,
      users: [],
      channels: [],
      chatHistory: []
    };
  }

  componentDidMount() {
    const { currentRoom, currentUser } = this.state;
    this.props.getResource(currentUser, currentRoom);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.width !== this.props.width) {
      if (this.props.width === "sm" || this.props.width === "xs") {
        this.setState({
          open: false
        });
      } else {
        this.setState({
          open: true
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps.resource;
    this.setState({
      loading: loading
    });
    if (!loading) {
      const { users, channels, chatHistory } = nextProps.resource.resource;
      this.setState({
        users: users,
        channels: channels,
        chatHistory: chatHistory
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeRoom = roomId => e => {
    this.setState({
      currentRoom: roomId
    });
    localStorage.setItem("currentRoom", roomId);
    this.props.getResource(this.state.currentUser, roomId);
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleKeyPress = e => {
    const { users, currentUser, currentRoom } = this.state;
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        const newMessage = {
          id: uuidv1(),
          from: currentUser.id,
          to: currentRoom,
          message: e.target.value,
          timestamp: Date.now()
        };
        const toUser = users.filter(user => user.id === currentRoom)[0];
        const stateNewMessage = {
          id: uuidv1(),
          from: currentUser.id,
          to: currentRoom,
          message: e.target.value,
          timestamp: Date.now(),
          toName: toUser ? toUser.userName : "",
          fromName: currentUser.userName
        };
        this.setState(prevState => ({
          chatHistory: [...prevState.chatHistory, stateNewMessage],
          message: ""
        }));
        this.props.sendMessage(newMessage);
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { loading, chatHistory, users, channels, open } = this.state;

    if (loading) {
      return <Spinner />;
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <CommonLayout
              open={open}
              handleDrawerClose={this.handleDrawerClose}
              handleDrawerOpen={this.handleDrawerOpen}
              onChangeRoom={this.onChangeRoom}
            />
            <CssBaseline />
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open
              })}
            >
              <div className={classes.toolbar} />
              {chatHistory.map(chat => (
                <Message
                  userName={chat.fromName}
                  timestamp={
                    new Date().getMonth(chat.timestamp) +
                    1 +
                    "/" +
                    new Date().getDate(chat.timestamp) +
                    "/" +
                    new Date().getFullYear(chat.timestamp) +
                    " " +
                    new Date().getHours(chat.timestamp) +
                    ":" +
                    new Date().getMinutes(chat.timestamp)
                  }
                  message={chat.message}
                  key={chat.id}
                />
              ))}
              <div className={classes.toolbar} />
              <div className={classes.toolbar} />
            </main>

            <TextField
              name="message"
              id="outlined-bare"
              className={classNames(classes.messageTextField, {
                [classes.messageTextFieldShift]: open
              })}
              margin="normal"
              variant="outlined"
              multiline
              rows={1}
              onKeyPress={this.handleKeyPress}
              value={this.state.message}
              onChange={this.onChange}
            />
          </div>
        </MuiThemeProvider>
      );
    }
  }
}

Main.propTypes = {
  getResource: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  resource: state.resource
});

export default connect(
  mapStateToProps,
  { getResource, sendMessage }
)(withStyles(layoutStyles, { withTheme: true })(withWidth()(Main)));
