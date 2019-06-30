import React, { Component } from 'react';
import './App.css';
import { Router, navigate } from '@reach/router';
import firebase from './components/Firebase';

import Login from './components/login';
import Register from './components/register';
import Todos from './components/todos';
import Nav from './components/nav';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/todos');
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/login');
      });
  };

  render() {
    return (
      <div className="App">
        <header>
        <Nav
            user={this.state.user}
            logOutUser={this.logOutUser}
          />
          {this.state.user && (
            <Todos
              user={this.state.user} 
              userName={this.state.displayName}
              logOutUser={this.logOutUser}
            />
          )}
        </header>

        <Router>
          <Login path="/login" />
          <Register path="/register" registerUser={this.registerUser} />
          <Todos path="/"  user={this.state.user} />
        </Router>

      </div>
    );
  }
}

export default App;
