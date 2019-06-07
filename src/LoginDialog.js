import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import { getFirstName, getLastName, getAvatar, getUsername } from './Action/index';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


class AlertDialog extends React.Component {
  
constructor(props){
  super(props)

this.state = {
    open: false,
    username: '',
    password: '',
    errorUsername: false,
    errorPassword: false,
    errorLabelUsername: 'Username',
    errorLabelPassword: 'Password',
    errorMessage: '',
    userFirstName: '',
    passwordVisibility: false
  };

  this.handleOnClick = this.handleOnClick.bind(this);
}

//Handle the change of the textbox. Set the state of the given value to the content of the text box.
handleOnChange = (e) => {
  this.setState({[e.target.id]: e.target.value })
};

//Handle Click and validation.
handleOnClick = () => {

  let databaseUsernames = this.props.usernames,
      databasePassword = this.props.passwords,
      databaseFirstName = this.props.firstnames,
      databaseLastName = this.props.lastNames,
      databaseAvatar = this.props.avatars,
      textfieldUsername = this.state.username,
      textfieldPassword = this.state.password,
      usernameResult = false,
      passwordResult = false,
      firstName = '',
      lastName = '',
      avatar = '',
      userName = '';

  Object.values(databaseUsernames).map(function(value, id){ 
      
    if(textfieldUsername === value) {
        usernameResult = true;
        
      if(textfieldPassword === databasePassword[id]){
        passwordResult = true;
        firstName = databaseFirstName[id];
        lastName = databaseLastName[id];
        avatar = databaseAvatar[id];
        userName = databaseUsernames[id];
        
      }
    }
  })

  this.props.getAvatar(avatar);
  this.props.getFirstName(firstName);
  this.props.getLastName(lastName);
  this.props.getUsername(userName);

  if(textfieldUsername !== ''){
    this.setState({ errorLabelUsername: 'Username',
                    errorUsername: false })

      if(!usernameResult) {
        this.setState({ errorLabelUsername: 'Error',
                        errorUsername: true,
                        errorMessage: 'Username is not registered.' })
      }

      else {
        this.setState({ errorLabelUsername: 'Username',
                        errorUsername: false})
      }

      if(!passwordResult && usernameResult) {
        this.setState({ errorLabelPassword: 'Error',
                        errorPassword: true,
                        errorMessage: 'Password is incorrect.'})
      }

      if(usernameResult && passwordResult){
        this.setState({ errorLabelUsername: 'Username',
                        errorUsername: false,
                        errorLabelPassword: 'Password',
                        errorPassword: false,
                        errorMessage: '' })
        this.props.action();           
        this.props.close();
      }
  }

  else {
    this.setState({ errorLabelUsername: 'Required',
                    errorUsername: true })

    if(textfieldPassword === '') {
      this.setState({ errorLabelPassword: 'Required',
                      errorPassword: true })
    }
  }
} 

handlePasswordVisibility = () => {
  this.setState({ passwordVisibility: !this.state.passwordVisibility })
}

render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">{"Welcome"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            
            <form autoComplete="off">
            <TextField
                id="username"
                label={this.state.errorLabelUsername}
                type="email"
                placeholder="Please enter your username"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleOnChange.bind(this)}
                error={this.state.errorUsername}
                autoFocus
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                                    )
                }}
            />
            
            <br />

            <TextField
                id="password"
                label={this.state.errorLabelPassword}
                type={this.state.passwordVisibility ? "text" : "password"}
                placeholder="Please enter your password"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleOnChange.bind(this)}
                error={this.state.errorPassword}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end"
                                    onClick={() => this.handlePasswordVisibility()}
              >           {this.state.passwordVisibility ? <VisibilityOff /> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    )
                }}
              />
           <h5 className="error-message">{this.state.errorMessage}</h5>
           <Link to="/ForgotPassword" className="link">Forgot your password?</Link>
            </form>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleOnClick()} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    firstName: state.firstName,
    lastName: state.lastName,
    avatar: state.avatar,
    userName: state.userName
  }
}

export default connect(mapStateToProps, { getFirstName, getLastName, getAvatar, getUsername })(AlertDialog);