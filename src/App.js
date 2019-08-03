import React, { Component } from 'react';
import AppBar from './AppBar';
import style from './Style/style.css';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props){
    super(props)
  }

  render(){ 
    return (
    <AppBar />
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
export default connect(mapStateToProps)(App);
