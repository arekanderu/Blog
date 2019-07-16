import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteDialog extends React.Component {

constructor(props){
    super(props)

    this.state = {
        open: false,
    }
}

handleOnClick = () => {
  this.props.delete();
  this.props.close();
}

render(){
    return(
        <div>
       <Dialog
          open={this.props.open}
          onClose={this.props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xs">
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>{this.props.title}</p>
              <small>{this.props.content}</small>
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

    )
}

}

export default DeleteDialog;