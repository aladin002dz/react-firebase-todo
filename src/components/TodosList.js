import React, { Component } from 'react';
import firebase from './Firebase';
import { navigate } from '@reach/router';

class TodosList extends Component {
  constructor(props) {
    super(props);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

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

          <div className="col-8 text-left">
            {item.todoName}
          </div>

          <div
            className="col-4 text-right"
            role="group"
            aria-label="Todo Options"
          >
            <button
              className="btn btn-sm"
              title="Delete Todo"
              onClick={e => this.deleteTodo(e, item.todoID)}
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      );
    });

    return <div>{myTodos}</div>;
  }
}

export default TodosList;
