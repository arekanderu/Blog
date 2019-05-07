import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { Link } from "react-router-dom";
import LoginDialog from './LoginDialog';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends React.Component {
  state = {
    open: false,
  };

  handleOnClick = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false })
  }

render(){
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" style={styles.grow}>
              Blog
            </Typography>
            {/* <Link to="/LoginDialog"> */}
            <Button onClick={this.handleOnClick} color="inherit">Login</Button>
            {/* </Link> */}
          </Toolbar>
        </AppBar>
        <LoginDialog open={this.state.open} close={this.handleClose}/>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);