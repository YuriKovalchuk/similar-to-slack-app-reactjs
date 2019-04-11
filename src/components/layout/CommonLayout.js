import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

/* mui core dependencies */
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

/* icons */
import MenuIcon from "@material-ui/icons/Menu";
import NotificationIcon from "@material-ui/icons/NotificationsPausedOutlined";
import ArrowIcon from "@material-ui/icons/ArrowBackIosOutlined";
import AddIcon from "@material-ui/icons/ControlPointOutlined";
import EarthIcon from "@material-ui/icons/PublicOutlined";
import PersonIcon from "@material-ui/icons/PersonOutline";

/* custom styles && themes */
import layoutStyles from "../../styles/layout";
import theme from "../../styles/theme";

//const WithWidth = toRenderProps(withWidth());

class CommonLayout extends Component {
  constructor(props) {
    super(props);
    const currentUser = props.auth.user;
    const { users, channels, chatHistory } = props.resource.resource;
    let contactDetails = [];
    let contacts = currentUser.contacts;
    contacts.map(contact => {
      contactDetails.push(users.filter(user => user.id === contact)[0]);
    });
    this.state = {
      users: users,
      channels: channels,
      contactDetails: contactDetails,
      currentUser: currentUser
    };
  }

  handleAddPrivateContact = () => {
    this.props.history.push("/add-private-contact");
  };

  handleCreateChannel = () => {
    this.props.history.push("/create-channel");
  };

  render() {
    const { contactDetails, channels, currentUser } = this.state;
    const {
      open,
      classes,
      onChangeRoom,
      handleDrawerClose,
      handleDrawerOpen
    } = this.props;

    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
          color="secondary"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Test chat platform
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography variant="h5" color="secondary">
              {currentUser.userName}
            </Typography>
            <IconButton color="secondary">
              <NotificationIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={handleDrawerClose}
              className={classes.drawerCloseBtn}
            >
              <ArrowIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.drawerHeader}>
            <Typography variant="subtitle1" color="secondary">
              Channel
            </Typography>
            <IconButton onClick={this.handleCreateChannel} color="secondary">
              <AddIcon />
            </IconButton>
          </div>
          <List>
            {channels.map(channel => (
              <ListItem
                button
                key={channel.id}
                onClick={onChangeRoom(channel.id)}
              >
                <ListItemIcon>
                  <EarthIcon color="secondary" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="subtitle2" color="secondary">
                    {channel.channelName}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
          <div className={classes.drawerHeader}>
            <Typography variant="subtitle1" color="secondary">
              Direct Message
            </Typography>
            <IconButton
              onClick={this.handleAddPrivateContact}
              color="secondary"
            >
              <AddIcon />
            </IconButton>
          </div>
          <List>
            {contactDetails.map(contactDetail => (
              <ListItem
                button
                key={contactDetail.id}
                onClick={onChangeRoom(contactDetail.id)}
              >
                <ListItemIcon>
                  <PersonIcon color="secondary" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="subtitle2" color="secondary">
                    {contactDetail.userName}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

CommonLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  onChangeRoom: PropTypes.func.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  resource: state.resource
});

export default connect(
  mapStateToProps,
  null
)(withStyles(layoutStyles, { withTheme: true })(withRouter(CommonLayout)));
