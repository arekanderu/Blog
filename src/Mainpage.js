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

class MainPage extends React.Component {
  
    constructor(props){
      super(props)
    
    this.state = {
        open: false,
        
      };
    
    }

    render() {
        return (
          <div>
                <TextField
                    id="username"
                    label={this.state.errorLabelUsername}
                    type="email"
                    placeholder="Whats going on?"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    error={this.state.errorUsername}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                                        )
                    }}
                />
          </div>
        );
      }
    }
export default MainPage;
