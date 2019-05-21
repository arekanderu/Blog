import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginDialog from './LoginDialog';
import Connect from './Config/Database';
import { connect } from 'react-redux';
import MainPage from './Mainpage';

//Properties of App Bar
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
    databaseUserNames: {},
    databasePasswords: {},
    databaseFirstNames: {},
    databaseFirstNames: {},
    action: 'LOGIN',
    message: ''
  };

    //Read the database and set it on the state.
    readUserData = () => {
      let arrayUsername = [];
      let arrayPassword = [];
      let arrayFirstNames = [];
    
      Connect.database().ref('UserAccount').once('value', (snapshot) => {
        snapshot.forEach(item => {   
          let tempUsername = item.val().Username
          arrayUsername.push(tempUsername);
    
          let tempPassword = item.val().Password
          arrayPassword.push(tempPassword);

          let tempFirstNames = item.val().FirstName
          arrayFirstNames.push(tempFirstNames);
    
          this.setState({ databaseUserNames: arrayUsername,
                          databasePasswords: arrayPassword,
                          databaseFirstNames: arrayFirstNames })

        })
      });
    }

  //Handles the opening of the login box
  handleOnClick = () => {
    let action = this.state.action;

      if(action === 'LOGIN') {
        this.setState({ open: true });
      }

      else {
        this.setState({ action: 'LOGIN',
                        message: ''})

      }
  }

  //Handles the close of the login box
  handleClose = () => {
    this.setState({ open: false })
  }

  handleButtonNameChange = () => {
    this.setState({ action: 'LOG OUT'})
  }

  handleWelcomeMessage = () => {
    this.setState({ message: 'Welcome ' + this.props.firstName })
  }

  componentDidMount(){
    this.readUserData();
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
              Blog Project
            </Typography>
            {this.state.message} {this.props.firstName} 
            {/* <Link to="/LoginDialog"> */}
            <Button onClick={this.handleOnClick} color="inherit">
              {this.state.action}
            </Button>
            <LoginDialog open={this.state.open} 
                         close={this.handleClose}
                         usernames={this.state.databaseUserNames}
                         passwords={this.state.databasePasswords} 
                         firstname={this.state.databaseFirstNames}
                         action={this.handleButtonNameChange}
                         welcomeMessage = {this.handleWelcomeMessage}/>
            {/* </Link> */}
          </Toolbar>
        </AppBar> 
        <MainPage/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    firstName: state.firstName
  }
}

export default connect(mapStateToProps)(withStyles(styles)(NavBar));