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
        <div className="list-group-item d-flex" key={item.todoID}>
          <section
            className="btn-group align-self-center"
            role="group"
            aria-label="Todo Options"
          >
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Delete Todo"
              onClick={e => this.deleteTodo(e, item.todoID)}
            >
              Delete
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Check In"
              onClick={() =>
                navigate(
                  `/checkin/${this.props.userID}/${item.todoID}`
                )
              }
            >
              Check In
            </button>
          </section>

          <section className="pl-3 text-left align-self-center">
            {item.todoName}
          </section>
        </div>
      );
    });

    return <div>{myTodos}</div>;
  }
}

export default TodosList;
