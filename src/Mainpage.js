import React from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Send from '@material-ui/icons/Send';
import Clear from '@material-ui/icons/Clear';
import Connect from './Config/Database';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  
    constructor(props){
      super(props)
    
    this.state = {
        title: '',
        content: '',
        databaseBlogPost: ''
      };
    }

    //Handle the change of the textbox. Set the state of the given value to the content of the text box.
    handleOnChange = (e) => {
      this.setState({[e.target.id]: e.target.value })
    };

    handleOnClick = () => {
        let ref = Connect.database().ref('BlogPost/' + this.props.firstName + ' ' + this.props.lastName)
        let time = new Date().toLocaleString();

        let postData = {
          title: this.state.title,
          content: this.state.content,
          date: time
        }

        ref.push(postData);

        this.setState({ title: '',
                        content: ''})
    }

    handleOnClickCancel = () => {
      this.setState({ title: '',
                        content: ''})
    }
    
    readUserData = () => {
      let arrayBlogPosts = [];

      Connect.database().ref('BlogPost/' + this.props.firstName + ' ' + this.props.lastName).once('value', snapshot => {
        snapshot.forEach(item => { 
          
          let tempBlogPost = item.val()
          arrayBlogPosts.push(tempBlogPost);

          this.setState({ databaseBlogPost: arrayBlogPosts })
        })
    });
    }

    componentDidUpdate(){
      this.readUserData()
    }

    render() {
        return (
          <div>
              <Grid justify="center" container spacing={16}>
              <Avatar className="post" alt="Remy Sharp" src={this.props.avatar} />
                <Grid item xs={10}>
                <form autoComplete="off">

                  <TextField
                    id="title"
                    type="text"
                    placeholder="Whats going on?"
                    margin="normal"
                    variant="outlined"
                    value={this.state.title}
                    onChange={this.handleOnChange.bind(this)}
                    fullWidth/>

                  <TextField
                    id="content"
                    multiline={true}
                    rows={10}
                    rowsMax={15}
                    fullWidth
                    variant="outlined"
                    marginal="normal"
                    placeholder="Tell us what you feel..."
                    value={this.state.content}
                    onChange={this.handleOnChange.bind(this)}/>
                    
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

                {Object.values(this.state.databaseBlogPost).map(post => {
                  return (<div>
                          <h1>{post.title}</h1>
                          <h3>{post.date}</h3>
                          <p>{post.content}</p>
                          </div>
                  );
                })}
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
