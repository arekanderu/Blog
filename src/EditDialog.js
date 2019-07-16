import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Connect from './Config/Database';
import { connect } from 'react-redux';

class EditDialog extends React.Component {

constructor(props){
    super(props)

    this.state = {
        open: false,
        title: this.props.title,
        content: this.props.content,
        errorTitle: false,
        errorContent: false,
        placeHolderTitle: 'Whats going on?',
        placeHolderContent: 'Tell us what you feel...',
    }
}

//Handle the change of the textbox. Set the state of the given value to the content of the text box.
handleOnChange = (e) => {
  this.setState({[e.target.id]: e.target.value })
};

//When clicked the post will be validated whether its empty if not it will be posted to the database and run an update. 
handleOnClick = () => {
      
      let time = new Date().toLocaleString(),
          titleEntry = this.state.title,
          contentEntry = this.state.content
  
  if(titleEntry === '' && contentEntry === ''){
    this.setState({ errorTitle: true,
                    errorContent: true,
                    placeHolderTitle: 'Please enter a title',
                    placeHolderContent: 'Please enter something to start a blog' })
  }

  else if(titleEntry === '') {
    this.setState({ errorTitle: true,
                    errorContent: false,
                    placeHolderTitle: 'Please enter a title' })
  }

  else if(contentEntry === '') {
    this.setState({ errorContent: true,
                    errorTitle: false,
                    placeHolderContent: 'Please enter something' })
  }

  else {
        this.setState({ errorTitle: false,
                        errorContent: false,
                        placeHolderTitle: 'Whats going on?',
                        placeHolderContent: 'Tell us what you feel...' })

  Connect.database().ref('BlogPost/' + this.props.firstName + ' ' + this.props.lastName).child(this.props.keyValue).update({ title: this.state.title, content: this.state.content });
  this.props.close();  
  this.props.refresh();
}
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
          maxWidth="xl">
          <DialogTitle id="alert-dialog-title">{"Edit"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <form autoComplete="off">
                <TextField
                    id="title"
                    label='Title'
                    type='text'
                    value={this.state.title}
                    margin="normal"
                    variant="outlined"
                    error={this.state.errorTitle}
                    placeholder={this.state.placeHolderTitle}
                    autoFocus
                    fullWidth
                    onChange={this.handleOnChange.bind(this)}
                />

                <TextField
                    id="content"
                    label='Content'
                    type='text'
                    value={this.state.content}
                    margin="normal"
                    variant="outlined"
                    multiline={true}
                    rows={5}
                    rowsMax={5}
                    error={this.state.errorContent}
                    placeholder={this.state.placeHolderContent}
                    fullWidth
                    onChange={this.handleOnChange.bind(this)}
                />

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

    )
}
}

function mapStateToProps(state){
  return{
    firstName: state.firstName,
    lastName: state.lastName
  }
}

export default connect(mapStateToProps)(EditDialog);