import React from "react";
import PropTypes from "prop-types";

/* mui core dependencies */
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

/* custom style && theme */
import layoutStyles from "../../styles/layout";
import theme from "../../styles/theme";

const Message = ({ classes, userName, timestamp, message }) => {
  return (
    <Grid container direction="row" wrap="nowrap">
      <Grid item>
        <Avatar className={classes.avatar}>{userName.substring(0, 2)}</Avatar>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Typography variant="h6" gutterBottom>
              {userName}
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              className={classes.timestamp}
            >
              {timestamp}
            </Typography>
          </Grid>
          <Typography variant="subtitle1" gutterBottom>
            {message}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

Message.defaultProps = {};

export default withStyles(layoutStyles, { withTheme: true })(Message);
