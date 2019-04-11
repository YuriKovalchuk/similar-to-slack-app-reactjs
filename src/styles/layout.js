import { fade } from "@material-ui/core/styles/colorManipulator";
import deepOrange from "@material-ui/core/colors/deepOrange";

const drawerWidth = 240;

const layoutStyles = theme => ({
  root: {
    display: "flex",
    height: "100%"
  },
  heightFull: {
    height: "100%"
  },
  commonPadding: {
    padding: 10
  },
  searchFieldGroup: {
    width: "100%",
    maxWidth: "800px"
  },
  textFieldGroup: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: 20
  },
  inputGroup: {
    fontSize: 24
  },
  infoLabel: {
    color: "blue"
  },
  errorLabel: {
    color: "red"
  },
  buttonGroup: {
    background: "#3f0e40",
    color: "white",
    width: "100%",
    maxWidth: "200px",
    marginTop: 20
  },
  secondaryButtonGroup: {
    background: "white",
    color: "#3f0e40",
    width: "100%",
    maxWidth: "200px",
    marginTop: 20
  },
  messageTextField: {
    position: "fixed",
    marginBottom: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    width: "100%",
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    paddingLeft: 0
  },
  messageTextFieldShift: {
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    paddingLeft: drawerWidth
  },
  drawerCloseBtn: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#3f0e40"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "space-between"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  avatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  timestamp: {
    marginLeft: 10
  }
});

export default layoutStyles;
