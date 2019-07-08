import React, { Component } from 'react';
import './App.css';
import { Router, navigate } from '@reach/router';
import firebase from './components/Firebase';

import Login from './components/Login';
import Register from './components/Register';
import Todos from './components/Todos';
import Nav from './components/Nav';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
      todos:[]
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

        const todosRef = firebase
          .database()
          .ref('todos/' + FBUser.uid);

        todosRef.on('value', snapshot => {
          let todos = snapshot.val();
          let todosList = [];

          for (let item in todos) {
            todosList.push({
              todoID: item,
              todoName: todos[item].todoName,
              completed: todos[item].completed
            });
          }

          this.setState({
            todos: todosList,
            howManyTodos: todosList.length
          });
        });
      } else {
        this.setState({ user: null });
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
        navigate('/');
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

  addTodo = todoName => {
    const ref = firebase
      .database()
      .ref(`todos/${this.state.user.uid}`);
    ref.push({ todoName: todoName, completed: false });
  };

  render() {
    return (
      <div className="App">
        <header>
        <Nav
            user={this.state.user}
            logOutUser={this.logOutUser}
          />
        </header>

        <Router>
          <Login path="/login" />
          <Register path="/register" registerUser={this.registerUser} />
          <Todos path="/"  
            user={this.state.user}
            todos={this.state.todos}
            addTodo={this.addTodo}
            userID={this.state.userID} />
        </Router>

      </div>
    );
  }
}

export default App;
