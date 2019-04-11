import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";

/* mui core dependencies */
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

/* custom components */
import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";

/* actions */
import { createAccount } from "../../actions/authActions";

/* validations */
import accountValidation from "../../validation/account-validation";

/* custom style && theme */
import layoutStyles from "../../styles/layout";
import theme from "../../styles/theme";

class CreateAccount extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: "",
      fullName: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isRegistered) {
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

  onGoOn = e => {
    const userData = {
      id: uuidv1(),
      userName: this.state.userName,
      fullName: this.state.fullName,
      contacts: []
    };
    const validationResult = accountValidation(userData);

    if (validationResult.isValid) {
      this.props.createAccount(userData);
    }
    this.setState({
      errors: validationResult.errors
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading } = this.state;
    const { classes } = this.props;

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
              Please register your info!
            </Typography>
            <TextFieldGroup
              type="text"
              name="userName"
              value={this.state.userName}
              onChange={this.onChange}
              required={true}
              disabled={false}
              error={this.state.errors.userName}
              label="User Name"
            />
            <TextFieldGroup
              type="text"
              name="fullName"
              value={this.state.fullName}
              onChange={this.onChange}
              required={true}
              disabled={false}
              error={this.state.errors.fullName}
              label="Full Name"
            />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
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

CreateAccount.propTypes = {
  createAccount: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createAccount }
)(withStyles(layoutStyles, { withTheme: true })(CreateAccount));
