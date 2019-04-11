import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

/* mui core dependencies */
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

/* custom components */
import MultiSelect from "../common/MultiSelect";
import Spinner from "../common/Spinner";

/* actions */
import { addContacts } from "../../actions/authActions";

/* custom style && theme */
import layoutStyles from "../../styles/layout";
import theme from "../../styles/theme";

/* validation */
import isEmpty from "../../validation/is-empty";

class AddPrivateContact extends React.Component {
  constructor(props) {
    super(props);
    /* Find out users who are not registered in contact */
    const currentUser = props.auth.user;
    const { users, channels, chatHistory } = props.resource.resource;
    let currentContacts = currentUser.contacts;
    let userOptions = users;
    currentContacts.map(contact => {
      userOptions = userOptions.filter(
        user => user.id !== contact && user.id !== currentUser.id
      );
    });
    userOptions = userOptions.filter(user => user.id !== currentUser.id);
    userOptions = userOptions.map(user => {
      return { label: user.userName, value: user.id };
    });
    this.state = {
      loading: false,
      currentUser: currentUser,
      userOptions: userOptions,
      currentContacts: currentContacts,
      selectedOptions: []
    };
  }

  componentDidMount() {
    if (isEmpty(this.props.resource.resource.users)) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps.auth;
    this.setState({
      loading: loading
    });
    if (!loading) {
      this.props.history.push("/");
    }
  }

  onSelect = selectedOptions => {
    this.setState({
      selectedOptions: selectedOptions
    });
  };

  onBack = e => {
    this.props.history.push("/");
  };

  onGoOn = e => {
    const { currentUser, currentContacts, selectedOptions } = this.state;
    let newContacts = [];
    if (selectedOptions.length) {
      selectedOptions.map(option => {
        newContacts.push(option.value);
      });
      newContacts = currentContacts.concat(newContacts);
      this.props.addContacts(currentUser.id, newContacts);
    }
  };

  render() {
    const { classes } = this.props;
    const { userOptions, loading } = this.state;
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.heightFull}
        >
          <Grid item className={classes.commonPadding}>
            <Typography variant="h4" gutterBottom>
              Please add private contact
            </Typography>
            <Grid item className={classes.searchFieldGroup}>
              <MultiSelect values={userOptions} onChange={this.onSelect} />
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button
                onClick={this.onBack}
                className={classes.secondaryButtonGroup}
              >
                Back
              </Button>
              <Button onClick={this.onGoOn} className={classes.buttonGroup}>
                Go on
              </Button>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }
}

AddPrivateContact.propTypes = {
  addContacts: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  resource: state.resource
});

export default connect(
  mapStateToProps,
  { addContacts }
)(withStyles(layoutStyles, { withTheme: true })(AddPrivateContact));
