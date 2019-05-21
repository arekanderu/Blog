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
import Lock from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import { getFirstName } from './Action/index';

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
    userFirstName: ''
  };

  this.handleOnClick = this.handleOnClick.bind(this);
}

//Handle the change of the textbox. Set the state of the given value to the content of the text box.
handleOnChange = (e) => {
  this.setState({[e.target.id]: e.target.value })
};

//Handle Click and validation.
handleOnClick = () => {

  let databaseUsernames = this.props.usernames;
  let databasePassword = this.props.passwords;
  let databaseFirstName = this.props.firstname;
  let textfieldUsername = this.state.username;
  let textfieldPassword = this.state.password;
  let usernameResult = false;
  let passwordResult = false;
  let firstName = '';

  Object.values(databaseUsernames).map(function(value, id){ 
      
    if(textfieldUsername === value) {
        usernameResult = true;
      if(textfieldPassword === databasePassword[id]){
        passwordResult = true;
        firstName = databaseFirstName[id];
      }
    }
  })
  this.props.getFirstName(firstName);

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
                        errorLabelUsername: false})
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
        this.props.welcomeMessage();               
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
                type="password"
                placeholder="Please enter your password"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleOnChange.bind(this)}
                error={this.state.errorPassword}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    )
                }}
              />
           <h5 className="error-message">{this.state.errorMessage}</h5>
           <Link to="/ForgotPassword" className="link">Forgot your password?</Link>
            </form>

            </DialogContentText>
          </DialogContent>
          {/* {this.renderRedirect()} */}
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleOnClick()} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        {console.log(this.props.firstName)}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    firstName: state.firstName
  }
}

export default connect(mapStateToProps, {getFirstName})(AlertDialog);