import React from "react";
import PropTypes from "prop-types";

/* mui core dependencies */
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

/* custom style && theme */
import layoutStyles from "../../styles/layout";
import theme from "../../styles/theme";

const TextFieldGroup = ({
  classes,
  name,
  label,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
  required
}) => {
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <TextField
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        label={label}
        margin="normal"
        className={classes.textFieldGroup}
        InputProps={{
          classes: {
            input: classes.inputGroup
          }
        }}
        InputLabelProps={{
          FormLabelClasses: {
            root: classes.inputGroup
          }
        }}
      />
      {info && !error && (
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.infoLabel}
        >
          {info}
        </Typography>
      )}
      {error && (
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.errorLabel}
        >
          {error}
        </Typography>
      )}
    </Grid>
  );
};

TextFieldGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default withStyles(layoutStyles, { withTheme: true })(TextFieldGroup);
