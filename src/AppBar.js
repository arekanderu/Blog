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

require('./LoginDialog');

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
  constructor(props){
    super(props)
  
  this.state = {
        open: false,
        databaseUserNames: {},
        databasePasswords: {},
        databaseFirstNames: {},
        databaseLastNames: {},
        databaseAvatars: {},
        action: 'LOGIN',
        message: '',
        openMainPage: false,
  };

  this.handleOnClick = this.handleOnClick.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.handleChange = this.handleChange.bind(this);

  }

    //Read the database and set it on the state.
    readUserData = () => {
      let arrayUsernames = [],
          arrayPasswords = [],
          arrayFirstNames = [],
          arrayLastNames = [],
          arrayAvatars = [];
    
      Connect.database().ref('UserAccount').once('value', (snapshot) => {
        snapshot.forEach(item => {   
          let tempUsername = item.val().Username
          arrayUsernames.push(tempUsername);
    
          let tempPassword = item.val().Password
          arrayPasswords.push(tempPassword);

          let tempFirstNames = item.val().FirstName
          arrayFirstNames.push(tempFirstNames);

          let tempLastNames = item.val().LastName
          arrayLastNames.push(tempLastNames);

          let tempAvatars = item.val().Avatar
          arrayAvatars.push(tempAvatars);
    
          this.setState({ databaseUserNames: arrayUsernames,
                          databasePasswords: arrayPasswords,
                          databaseFirstNames: arrayFirstNames,
                          databaseLastNames: arrayLastNames,
                          databaseAvatars: arrayAvatars })
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
                        message: '',
                        openMainPage: false })

      }
  }

  //Handles the close of the login box
  handleClose = () => {
    this.setState({ open: false })
  }

  //Change button to log out then displays welcome string and open main page.
  handleChange = () => {
    this.setState({ action: 'LOG OUT',
                    message: 'Welcome ',
                    openMainPage: true })
  }

  //Adds welcome message to the username
  showUsersFirstName = () => {
      if(this.state.openMainPage) {
        return this.state.message + this.props.firstName + ' ' + this.props.lastName
      }
  }

  componentWillMount(){
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
            {this.showUsersFirstName()}
            <Button onClick={this.handleOnClick} color="inherit">
              {this.state.action} 
            </Button>
            <LoginDialog open={this.state.open} 
                         close={this.handleClose}
                         usernames={this.state.databaseUserNames}
                         passwords={this.state.databasePasswords} 
                         firstnames={this.state.databaseFirstNames}
                         lastNames={this.state.databaseLastNames}
                         avatars={this.state.databaseAvatars}
                         action={this.handleChange}/>
          </Toolbar>
        </AppBar> 
        {this.state.openMainPage ? <MainPage avatar={this.props.avatar}/> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    firstName: state.firstName,
    lastName: state.lastName,
    avatar: state.avatar
  }
}

export default connect(mapStateToProps)(withStyles(styles)(NavBar));