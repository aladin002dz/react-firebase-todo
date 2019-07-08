import React, { Component } from 'react';
import firebase from './Firebase';
import { navigate } from '@reach/router';

class TodosList extends Component {
  constructor(props) {
    super(props);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  completeTodo = (e, whichTodo, todoName) => {
    e.preventDefault();
    firebase.database().ref(`todos/${this.props.userID}/${whichTodo}`).set({
      todoName: todoName,
      completed: true
    });
  };

  deleteTodo = (e, whichTodo) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`todos/${this.props.userID}/${whichTodo}`);
    ref.remove();
  };

  render() {
    const { todos } = this.props;
    const myTodos = todos.map(item => {
      return (
        <div className="row" key={item.todoID}>

          <div className="col-3 text-left">
            {item.todoName}
          </div>
          <div className="col-3 text-left">                    
            {item.completed ? (
                      <span className="text-success">
                        completed
                      </span> 
                    ) : (
                      <span className="text-danger">
                        in progress
                      </span> 
                    ) }
          </div>
          <div
            className="col-6 text-right"
            role="group"
            aria-label="Todo Options"
          >
            <button
              className="btn btn-sm btn-outline-dark"
              title="Complete Todo"
              onClick={e => this.completeTodo(e, item.todoID, item.todoName)}
            >
              <i class="fas fa-check"></i> mark as complete
            </button>
            <button
              className="btn btn-sm btn-outline-dark"
              title="Delete Todo"
              onClick={e => this.deleteTodo(e, item.todoID)}
            >
              <i class="far fa-trash-alt"></i> delete
            </button>
          </div>
        </div>
      );
    });

    return <div>{myTodos}</div>;
  }
}

export default TodosList;
