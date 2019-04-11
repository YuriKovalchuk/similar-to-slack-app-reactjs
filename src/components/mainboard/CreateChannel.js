import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";

/* mui core dependencies */
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

/* custom components */
import MultiSelect from "../common/MultiSelect";
import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";

/* actions */
import { addChannel } from "../../actions/resourceActions";

/* custom style && theme */
import layoutStyles from "../../styles/layout";
import theme from "../../styles/theme";

/* validations */
import createChannelValidation from "../../validation/create-channel-validation";
import isEmpty from "../../validation/is-empty";

class CreateChannel extends React.Component {
  constructor(props) {
    super(props);
    /* Find out users who are not registered in contact */
    const currentUser = props.auth.user;
    const { users, channels, chatHistory } = props.resource.resource;
    let userOptions = users;
    userOptions = userOptions.filter(user => user.id !== currentUser.id);
    userOptions = userOptions.map(user => {
      return { label: user.userName, value: user.id };
    });
    this.state = {
      loading: false,
      currentUser: currentUser,
      channelName: "",
      userOptions: userOptions,
      selectedOptions: [],
      errors: {}
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onBack = e => {
    this.props.history.push("/");
  };

  onGoOn = e => {
    const { selectedOptions } = this.state;
    let members = [];
    selectedOptions.map(option => {
      members.push(option.value);
    });
    const channelData = {
      id: uuidv1(),
      channelName: this.state.channelName,
      members: members
    };
    const validationResult = createChannelValidation(channelData);

    if (validationResult.isValid) {
      this.props.addChannel(channelData);
    }

    this.setState({
      errors: validationResult.errors
    });
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
              Please create new channel
            </Typography>
            <TextFieldGroup
              type="text"
              name="channelName"
              value={this.state.channelName}
              onChange={this.onChange}
              required={true}
              disabled={false}
              error={this.state.errors.channelName}
              label="Channel Name"
            />
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

CreateChannel.propTypes = {
  addChannel: PropTypes.func.isRequired,
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
  { addChannel }
)(withStyles(layoutStyles, { withTheme: true })(CreateChannel));
