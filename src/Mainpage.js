import React from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Send from '@material-ui/icons/Send';
import Clear from '@material-ui/icons/Clear';
import Connect from './Config/Database';
import { connect } from 'react-redux';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import DeleteDialog from './DeleteDialog';


class MainPage extends React.Component {
  
    constructor(props){
      super(props)
    
    this.state = {
        title: '',
        content: '',
        databaseBlogPost: '',
        keyValue: '',
        errorTitle: false,
        errorContent: false,
        placeHolderTitle: 'Whats going on?',
        placeHolderContent: 'Tell us what you feel...',
        open: false,
        
      };
    }

    //Handle the change of the textbox. Set the state of the given value to the content of the text box.
    handleOnChange = (e) => {
      this.setState({[e.target.id]: e.target.value })
    };

    handleOnClick = () => {
        let ref = Connect.database().ref('BlogPost/' + this.props.firstName + ' ' + this.props.lastName),
            time = new Date().toLocaleString(),
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
          
        let postData = {
          title: titleEntry,
          content: contentEntry,
          date: time
        }

        ref.push(postData);
        this.setState({ title: '',
                        content: ''})
        this.readUserData()
      }

        
    }

    handleOnClickCancel = () => {
      this.setState({ title: '',
                        content: ''})
    }
    
    readUserData = () => {
      let arrayBlogPosts = [],
          arrayKeyValue = [];

      Connect.database().ref('BlogPost/' + this.props.firstName + ' ' + this.props.lastName).once('value', snapshot => {
        snapshot.forEach(item => { 
          
          let tempBlogPost = item.val(),
              tempKeyValue = item.key;

          arrayBlogPosts.push(tempBlogPost);
          arrayKeyValue.push(tempKeyValue);

        })
        arrayBlogPosts.reverse();
        arrayKeyValue.reverse();

        this.setState({ databaseBlogPost: arrayBlogPosts,
                        keyValue: arrayKeyValue })
    });
    }

    handleDelete = (key) =>
    {
      this.setState({ open: true })
      let ref = Connect.database().ref('BlogPost/' + this.props.firstName + ' ' + this.props.lastName)
      ref.child(key).remove();
      this.readUserData()
    }

    componentDidMount(){
      this.readUserData()
    }

    render() {
      const { databaseBlogPost, keyValue } = this.state;
        return (
          <div>
            <br />
            <Grid justify="center" container spacing={16}>
              <Avatar className="post" alt="Remy Sharp" src={this.props.avatar} />
                <Grid item xs={10}>

                <form autoComplete="off">
                  <TextField
                    id="title"
                    type="text"
                    placeholder={this.state.placeHolderTitle}
                    margin="normal"
                    variant="outlined"
                    value={this.state.title}
                    onChange={this.handleOnChange.bind(this)}
                    error={this.state.errorTitle}
                    fullWidth />

                  <TextField
                    id="content"
                    multiline={true}
                    rows={10}
                    rowsMax={15}
                    fullWidth
                    variant="outlined"
                    marginal="normal"
                    placeholder={this.state.placeHolderContent}
                    value={this.state.content}
                    onChange={this.handleOnChange.bind(this)} 
                    error={this.state.errorContent} />
                    
                    <br />
                    <br />

                    <Button variant="contained" color="primary" onClick={() => this.handleOnClick()}>
                      Post <Send className="style" />
                    </Button>
                    &nbsp; 
                    <Button variant="contained" color="secondary" onClick={() => this.handleOnClickCancel()}>
                      Clear <Clear className="style" />
                    </Button>
                </form>
                
                <br />
                <br />
                  {Object.values(databaseBlogPost).map(({title,date, content}, i) => (
                  <div>
                  <h1>{title}</h1>
                  <h5 className="icons"> 
                  <Edit /> <Delete onClick={() => this.handleDelete(keyValue[i])}/>
                  </h5>
                  <small>{date}</small>
                  <p>{content}</p>
                  <hr />
                  <br />
                  <br />
                  </div>
                  ))}
                  <DeleteDialog open={this.state.open} />

                </Grid>
                </Grid>
          </div>
        );
      }
    }

function mapStateToProps(state){
  return{
    firstName: state.firstName,
    lastName: state.lastName
  }
}

export default connect(mapStateToProps)(MainPage);
