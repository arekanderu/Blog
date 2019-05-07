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
import Connect from './Config/Database';

class AlertDialog extends React.Component {
  
constructor(props){
  super(props)

this.state = {
    open: false,
    username: '',
    password: '',
    databaseUserNames: {},
    databasePasswords: {},
  }
}

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOnChange = (e) => {
    this.setState({[e.target.id]: e.target.value })
  };

  readUserData = () => {
    let arrayUsername = [];
    let arrayPassword = [];

    Connect.database().ref('UserAccount').once('value', (snapshot) => {
      snapshot.forEach(item => {   
        let tempUsername = item.val().Username
        arrayUsername.push(tempUsername);

        let tempPassword = item.val().Password
        arrayPassword.push(tempPassword)

        this.setState({ databaseUserNames: arrayUsername,
                        databasePasswords: arrayPassword })
      })
    });
}

  handleOnClick = () => {
  
    let tempUsername = this.state.databaseUserNames;
    let textfieldUsername = this.state.username;
    let usernameResult = false;

    Object.values(tempUsername).map(function(value){ 
      if(textfieldUsername === value) {
        usernameResult = true;
      }
    })

    let tempPassword = this.state.databasePasswords;
    let textFieldPassword = this.state.password;
    console.log()
    let passwordResult = false;

    Object.values(tempPassword).map(function(value){
      if(textFieldPassword === value){
        passwordResult = true;
      }
    })

    if(usernameResult && passwordResult) {
      alert('it worked')
    }

    
  }
    

  componentDidMount(){
    this.readUserData();
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
                label="Username"
                type="email"
                placeholder="Please enter your username"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleOnChange.bind(this)}
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
                label="Password"
                type="password"
                placeholder="Please enter your password"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.handleOnChange.bind(this)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    )
                }}
              />
              
            <br />
           <Link to="/ForgotPassword" className="link">Forgot your password?</Link>
            </form>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleOnClick()} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;